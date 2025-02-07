import express from 'express';
import * as userController from '../controllers/userPreferenceController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/preferences', authenticateToken ,userController.SaveUserPreference);
router.put('/preferences', authenticateToken ,userController.UpdateUserPreferences);
router.delete('/delete', authenticateToken ,userController.deleteUser);
router.delete('/preferences/delete', authenticateToken ,userController.deletePreferences);


export default router;