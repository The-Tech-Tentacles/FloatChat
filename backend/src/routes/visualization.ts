import { Router } from 'express';
import { Request, Response } from 'express';
import axios from 'axios';

const router = Router();
const ML_SERVICE_URL = process.env.PYTHON_ML_SERVICE_URL || 'http://localhost:8000';

// POST /api/visualization/plot
router.post('/plot', async (req: Request, res: Response) => {
  try {
    const { type, data, options } = req.body;
    
    const response = await axios.post(`${ML_SERVICE_URL}/api/visualization/plot`, {
      type,
      data,
      options
    });
    
    res.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating visualization'
    });
  }
});

// GET /api/visualization/map-data
router.get('/map-data', async (req: Request, res: Response) => {
  try {
    const { bounds, filters } = req.query;
    
    const response = await axios.get(`${ML_SERVICE_URL}/api/visualization/map-data`, {
      params: { bounds, filters }
    });
    
    res.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching map data'
    });
  }
});

export default router;