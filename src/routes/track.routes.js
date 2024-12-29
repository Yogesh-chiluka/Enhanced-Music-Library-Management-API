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

router.route('').get(verifyJWT,getAllTracksController);

router.route('/:id').get(verifyJWT,getTrackByIdController);

router.route('/add-track').post(verifyJWT,verifyEditor,addTrackController);

router.route('/:id').put(verifyJWT,verifyEditor,updateTrackByIdController);

router.route('/:id').delete(verifyJWT,verifyEditor,deleteTrackByIdController);


export default router
