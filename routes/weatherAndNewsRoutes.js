import express from 'express';
import * as dataController from '../controllers/weatherAndNewsController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();


router.get('/', dataController.getWeatherAndNews);
router.get('/personalised', authenticateToken,dataController.getPersonalizedWeatherAndNews);
router.delete("/clear-cache", authenticateToken, dataController.deleteCache)
router.delete("/clear-cache/:city", authenticateToken,dataController.deleteCacheCity)
    

export default router;
