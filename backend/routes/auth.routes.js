import express from "express"

import { registerUser , loginUser} from "../controllers/auth.controller.js"

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

export default router;