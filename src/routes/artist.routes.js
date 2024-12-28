import { Router } from "express";
import { verifyJWT } from '../middlewares/authentication.middleware.js'
import { verifyAdmin, verifyEditor, verifyViewer } from '../middlewares/authorization.middleware.js'
import { 
    getAllArtistsController,
    getArtistByIdController,
    addArtistController,
    updateArtistByIdController,
    deleteArtistByIdController,
 } from '../controllers/artist.controller.js'
const router = Router();

router.route('').get(verifyJWT,getAllArtistsController);

router.route('/:id').get(verifyJWT,getArtistByIdController)

router.route('/add-artist').post(verifyJWT,verifyAdmin,verifyEditor,addArtistController)

router.route('/:id').put(verifyJWT,verifyAdmin,verifyEditor,updateArtistByIdController)

router.route('/:id').delete(verifyJWT,verifyAdmin,verifyEditor,deleteArtistByIdController)


export default router