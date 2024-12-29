import { Router } from "express";
import { verifyJWT } from '../middlewares/authentication.middleware.js'
import { verifyAdmin, verifyEditor, verifyViewer } from '../middlewares/authorization.middleware.js'

import {
    getAllAlbumsController,
    getAlbumByIdController,
    addAlbumController,
    updateAlbumByIdController,
    deleteAlbumByIdController
} from '../controllers/album.controller.js'

const router = Router();

router.route('').get(verifyJWT,getAllAlbumsController);

router.route('/:id').get(verifyJWT,getAlbumByIdController);

router.route('/add-album').post(verifyJWT,verifyEditor,addAlbumController);

router.route('/:id').put(verifyJWT,verifyEditor,updateAlbumByIdController);

router.route('/:id').delete(verifyJWT,verifyEditor,deleteAlbumByIdController);


export default router