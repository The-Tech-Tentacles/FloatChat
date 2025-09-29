import { Router } from 'express';
import { Request, Response } from 'express';
import axios from 'axios';

const router = Router();

const ML_SERVICE_URL = process.env.PYTHON_ML_SERVICE_URL || 'http://localhost:8000';

// GET /api/data/floats
router.get('/floats', async (req: Request, res: Response) => {
  try {
    const { lat, lon, radius, startDate, endDate } = req.query;
    
    // Forward request to Python ML service
    const response = await axios.get(`${ML_SERVICE_URL}/api/floats`, {
      params: { lat, lon, radius, startDate, endDate }
    });
    
    res.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    console.error('Error fetching float data:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching float data'
    });
  }
});

// GET /api/data/profiles/:floatId
router.get('/profiles/:floatId', async (req: Request, res: Response) => {
  try {
    const { floatId } = req.params;
    const { parameter, startDate, endDate } = req.query;
    
    const response = await axios.get(`${ML_SERVICE_URL}/api/profiles/${floatId}`, {
      params: { parameter, startDate, endDate }
    });
    
    res.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    console.error('Error fetching profile data:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching profile data'
    });
  }
});

// GET /api/data/search
router.get('/search', async (req: Request, res: Response) => {
  try {
    const { query, limit = 10 } = req.query;
    
    const response = await axios.get(`${ML_SERVICE_URL}/api/search`, {
      params: { query, limit }
    });
    
    res.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    console.error('Error searching data:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching data'
    });
  }
});

// GET /api/data/statistics
router.get('/statistics', async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${ML_SERVICE_URL}/api/statistics`);
    
    res.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics'
    });
  }
});

export default router;