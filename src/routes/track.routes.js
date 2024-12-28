import { Router } from "express";
import { verifyJWT } from '../middlewares/authentication.middleware.js'
import { verifyAdmin, verifyEditor, verifyViewer } from '../middlewares/authorization.middleware.js'

import {
    getAllTracksController,
    getTrackByIdController,
    addTrackController,
    updateTrackByIdController,
    deleteTrackByIdController
} from '../controllers/track.controller.js'

const router = Router();

router.route('').get(verifyJWT,verifyAdmin,verifyEditor,getAllTracksController);

router.route('/:id').get(verifyJWT,verifyAdmin,verifyEditor,getTrackByIdController);

router.route('/add-track').post(verifyJWT,verifyAdmin,verifyEditor,addTrackController);

router.route('/:id').put(verifyJWT,verifyAdmin,verifyEditor,updateTrackByIdController);

router.route('/:id').delete(verifyJWT,verifyAdmin,verifyEditor,deleteTrackByIdController);


export default router
