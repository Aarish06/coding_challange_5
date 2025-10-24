import { Router } from "express";
import {
    moderatePost,
    flagUser,
    getPostById,
    getUserProfile,
    getFlaggedContentStats,
} from "../controllers/moderationController";

const router: Router = Router();

/**
 * @openapi
 * /moderation/post/{id}:
 *   get:
 *     summary: Retrieve a post by ID
 *     tags: [Moderation]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: ID of the post to retrieve
 *     responses:
 *       200:
 *         description: Post retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: "Post retrieved successfully" }
 *                 data:
 *                   $ref: "#/components/schemas/Post"
 *       404:
 *         description: Post not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
router.get('/post/:id', getPostById);

/**
 * @openapi
 * /moderation/post/{id}/moderate:
 *   post:
 *     summary: Moderate a post by ID
 *     tags: [Moderation]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: ID of the post to moderate
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               action: { type: string, enum: [flag, approve, hide, remove] }
 *               reason: { type: string }
 *               category: { type: string, enum: [spam, hateSpeech, inappropriateContent, violence] }
 *             required: [action, reason]
 *     responses:
 *       200:
 *         description: Post moderated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: "Post moderated successfully" }
 *                 data:
 *                   $ref: "#/components/schemas/ModerationAction"
 *       404:
 *         description: Post not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
router.post('/post/:id/moderate', moderatePost);

/**
 * @openapi
 * /moderation/user/{id}/profile:
 *   get:
 *     summary: Retrieve user profile by ID
 *     tags: [Moderation]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: ID of the user to retrieve
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: "User profile retrieved successfully" }
 *                 data:
 *                   $ref: "#/components/schemas/User"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
router.get('/user/:id/profile', getUserProfile);

/**
 * @openapi
 * /moderation/user/{id}/flag:
 *   post:
 *     summary: Flag a user by ID
 *     tags: [Moderation]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: ID of the user to flag
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason: { type: string }
 *               category: { type: string, enum: [spam, harassment, fakeAccount, inappropriateContent] }
 *               severity: { type: string, enum: [low, medium, high, critical] }
 *             required: [reason, category, severity]
 *     responses:
 *       200:
 *         description: User flagged successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: "User flagged successfully" }
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId: { type: string }
 *                     flaggedAt: { type: string, format: date-time }
 *                     severity: { type: string }
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
router.post('/user/:id/flag', flagUser);

/**
 * @openapi
 * /moderation/content/flags/stats:
 *   get:
 *     summary: Retrieve statistics on flagged content
 *     tags: [Moderation]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: timeframe
 *         schema: { type: string, enum: [day, week, month, year, all], default: month }
 *         description: Time period for statistics
 *       - in: query
 *         name: category
 *         schema: { type: string, enum: [spam, hateSpeech, inappropriateContent, violence, all], default: all }
 *         description: Filter by content category
 *     responses:
 *       200:
 *         description: Flagged content statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: "Flagged content statistics" }
 *                 data:
 *                   $ref: "#/components/schemas/FlaggedContentStats"
 *       400:
 *         description: Bad request - Invalid query parameters
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
router.get('/content/flags/stats', getFlaggedContentStats);
export default router;