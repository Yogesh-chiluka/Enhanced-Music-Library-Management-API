import { Router } from "express";
import { verifyJWT } from '../middlewares/authentication.middleware.js'

import {
    getAllFavoritesController,
    addFavoriteController,
    deleteFavoriteByIdController
} from '../controllers/favorite.controller.js'

const router = Router();

router.route('').get(verifyJWT,getAllFavoritesController);

router.route('/add-favorite').post(verifyJWT,addFavoriteController);

router.route('/:id').delete(verifyJWT,deleteFavoriteByIdController);


export default router

