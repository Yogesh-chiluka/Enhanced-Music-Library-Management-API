import { Router } from "express";
import { verifyJWT } from '../middlewares/authentication.middleware.js'
import { verifyAdmin, verifyEditor, verifyViewer } from '../middlewares/authorization.middleware.js'
import { 
    registerUser,
    loginUser,
    logoutUser,
    getUsers,
    addUser,
    deleteUser,
    updatePassword,
 } from '../controllers/user.controller.js'

const router = Router();


router.route('/login').post(loginUser)

router.route('/signup').post(registerUser)

router.route('/Logout').get(verifyJWT,logoutUser)

router.route('/users').get(verifyJWT,verifyAdmin,getUsers)

router.route('/users/add-user').post(verifyJWT,verifyAdmin,addUser)

router.route('/users/:id').delete(verifyJWT,verifyAdmin,deleteUser)

router.route('/users/update-password').put(verifyJWT,updatePassword)



export default router