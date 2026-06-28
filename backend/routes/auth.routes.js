import express from "express"

import { registerUser , loginUser ,getMe} from "../controllers/auth.controller.js"
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register new user
 *     tags:
 *       - Auth
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             required:
 *               - name
 *               - email
 *               - password
 *
 *             properties:
 *
 *               name:
 *                 type: string
 *                 example: Aryan
 *
 *               email:
 *                 type: string
 *                 example: aryan@gmail.com
 *
 *               password:
 *                 type: string
 *                 example: "123456"
 *
 *
 *     responses:
 *       201:
 *         description: User registered successfully
 *
 *       400:
 *         description: User already exists
 */
router.post("/register",registerUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Auth
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             required:
 *               - email
 *               - password
 *
 *             properties:
 *
 *               email:
 *                 type: string
 *                 example: aryan@gmail.com
 *
 *               password:
 *                 type: string
 *                 example: "123456"
 *
 *
 *     responses:
 *
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6...
 *
 *
 *       401:
 *         description: Invalid credentials
 *
 *       404:
 *         description: User not found
 */
router.post("/login",loginUser);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current logged-in user profile
 *     description: Returns the details of the currently authenticated user using JWT token.
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 6a3e7afc3b83bce32b2946d4
 *                     name:
 *                       type: string
 *                       example: Aryan Verma
 *                     email:
 *                       type: string
 *                       example: aryan@gmail.com
 *                     
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Not authorized
 */
router.get("/me",protect,getMe);

export default router;