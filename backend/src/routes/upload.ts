import { Router } from 'express';
import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import FormData from 'form-data';
import axios from 'axios';

const router = Router();
const ML_SERVICE_URL = process.env.PYTHON_ML_SERVICE_URL || 'http://localhost:8000';

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4();
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept NetCDF files
    if (file.mimetype === 'application/octet-stream' || 
        file.originalname.endsWith('.nc') || 
        file.originalname.endsWith('.netcdf')) {
      cb(null, true);
    } else {
      cb(new Error('Only NetCDF files are allowed'));
    }
  }
});

// POST /api/upload/netcdf
router.post('/netcdf', upload.single('file'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    // Forward file to Python ML service for processing
    const formData = new FormData();
    formData.append('file', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype
    });

    const response = await axios.post(`${ML_SERVICE_URL}/api/upload/process`, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    res.json({
      success: true,
      message: 'File uploaded and processed successfully',
      data: response.data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error processing uploaded file'
    });
  }
});

// GET /api/upload/status/:jobId
router.get('/status/:jobId', async (req: Request, res: Response) => {
  try {
    const { jobId } = req.params;
    
    const response = await axios.get(`${ML_SERVICE_URL}/api/upload/status/${jobId}`);
    
    res.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking upload status'
    });
  }
});

export default router;