import { Router } from "express";
import { getUsers, getUsersByIds } from "./user.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();
router.use(authMiddleware);

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [Users]
 *     summary: Get/search users
 *     security: [bearerAuth: []]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema: { type: string }
 *         description: Search name/email
 *     responses:
 *       200:
 *         description: Users list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id: { type: string, example: "507f1f77bcf86cd799439011" }
 *                   name: { type: string, example: "John Doe" }
 *                   email: { type: string, example: "john@example.com" }
 */
router.get('/', getUsers);
router.get("/by-ids", getUsersByIds);

export default router;
