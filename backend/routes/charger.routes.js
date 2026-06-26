import express from "express"
import {
    createCharger,
    getChargers,
    getChargerById,
    updateCharger,
    deleteCharger
} from "../controllers/charger.controller.js";

import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

// CREATE CHARGER
/**
 * @swagger
 * /chargers:
 *   post:
 *     summary: Create charging station
 *     tags:
 *       - Chargers
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: object
 *                 properties:
 *                   lat:
 *                     type: number
 *                   lng:
 *                     type: number
 *               status:
 *                 type: string
 *               powerOutput:
 *                 type: number
 *               connectorType:
 *                 type: string
 *               
 *
 *     responses:
 *       200:
 *         description: Charger created successfully
 */
router.post("/", protect, createCharger);

// GET ALL CHARGERS
/**
 * @swagger
 * /chargers:
 *   get:
 *     summary: Get all charging stations
 *     tags:
 *       - Chargers
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: connectorType
 *         schema:
 *           type: string
 *
 *       - in: query
 *         name: powerOutput
 *         schema:
 *           type: number
 *       - in: query
 *         name: search
 *         schema:
 *           type: string 
 *
 *     responses:
 *       200:
 *         description: Charger list
 */
router.get("/",protect,getChargers);

// GET SINGLE CHARGER
// GET SINGLE CHARGER

/**
 * @swagger
 * /chargers/{id}:
 *   get:
 *     summary: Get single charging station by ID
 *     tags:
 *       - Chargers
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Charger ID
 *
 *     responses:
 *       200:
 *         description: Charger fetched successfully
 *
 *       404:
 *         description: Charger not found
 */

router.get(
    "/:id",
    protect,
    getChargerById
);





// UPDATE CHARGER

/**
 * @swagger
 * /chargers/{id}:
 *   put:
 *     summary: Update charging station
 *     tags:
 *       - Chargers
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Charger ID
 *
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             properties:
 *
 *               name:
 *                 type: string
 *                 example: Tata Power Updated Station
 *
 *               status:
 *                 type: string
 *                 example: Active
 *
 *               powerOutput:
 *                 type: number
 *                 example: 120
 *
 *               connectorType:
 *                 type: string
 *                 example: CCS
 *
 *
 *     responses:
 *       200:
 *         description: Charger updated successfully
 *
 *       404:
 *         description: Charger not found
 */


router.put(
    "/:id",
    protect,
    updateCharger
);






// DELETE CHARGER
/**
 * @swagger
 * /chargers/{id}:
 *   delete:
 *     summary: Delete charging station
 *     tags:
 *       - Chargers
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Charger ID
 *
 *
 *     responses:
 *       200:
 *         description: Charger deleted successfully
 *
 *       404:
 *         description: Charger not found
 */
router.delete(
    "/:id",
    protect,
    deleteCharger
);

export default router;