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

router.route('').get(verifyJWT,verifyAdmin,verifyEditor,getAllAlbumsController);

router.route('/:id').get(verifyJWT,verifyAdmin,verifyEditor,getAlbumByIdController);

router.route('/add-album').post(verifyJWT,verifyAdmin,verifyEditor,addAlbumController);

router.route('/:id').put(verifyJWT,verifyAdmin,verifyEditor,updateAlbumByIdController);

router.route('/:id').delete(verifyJWT,verifyAdmin,verifyEditor,deleteAlbumByIdController);


export default router