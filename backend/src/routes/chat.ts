import { Router } from 'express';
import { Request, Response } from 'express';
import axios from 'axios';

const router = Router();
const ML_SERVICE_URL = process.env.PYTHON_ML_SERVICE_URL || 'http://localhost:8000';

// POST /api/chat/message
router.post('/message', async (req: Request, res: Response) => {
  try {
    const { message, conversationId } = req.body;
    
    const response = await axios.post(`${ML_SERVICE_URL}/api/chat/message`, {
      message,
      conversationId
    });
    
    res.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error processing chat message'
    });
  }
});

// GET /api/chat/conversations
router.get('/conversations', async (req: Request, res: Response) => {
  try {
    res.json({
      success: true,
      data: []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching conversations'
    });
  }
});

export default router;