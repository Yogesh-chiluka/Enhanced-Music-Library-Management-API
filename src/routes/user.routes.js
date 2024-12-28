import { Router } from "express";
import { verifyJWT } from '../middlewares/authentication.middleware.js'
import { verifyAdmin, verifyEditor, verifyViewer } from '../middlewares/authorization.middleware.js'
import { 
    registerUserController,
    loginUserController,
    logoutUserController,
    getUsersController,
    addUserController,
    deleteUserController,
    updatePasswordController,
 } from '../controllers/user.controller.js'

const router = Router();


router.route('/login').post(loginUserController)

router.route('/signup').post(registerUserController)

router.route('/Logout').get(verifyJWT,logoutUserController)

router.route('/users').get(verifyJWT,verifyAdmin,getUsersController)

router.route('/users/add-user').post(verifyJWT,verifyAdmin,addUserController)

router.route('/users/:id').delete(verifyJWT,verifyAdmin,deleteUserController)

router.route('/users/update-password').put(verifyJWT,updatePasswordController)



export default router