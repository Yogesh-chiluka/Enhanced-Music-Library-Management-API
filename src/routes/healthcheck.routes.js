import { Router } from "express";

import { 
    healthCheck,
    apiEndPoints
 } from "../controllers/healthcheck.controller.js";


const router = Router()

router.route('').get(healthCheck)

router.route('/api/v1').get(apiEndPoints);


export default router 