import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { getDashboardStats } from "./dashboard.controller";

const router = Router();

router.use(authMiddleware);
/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: User statistics
 */

/**
 * @swagger
 * /dashboard/stats:
 *   get:
 *     tags: [Dashboard]
 *     summary: Get dashboard statistics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard stats
 */
router.get('/stats', getDashboardStats);


export default router;
