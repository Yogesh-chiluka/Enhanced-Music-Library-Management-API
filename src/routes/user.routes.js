import { Router } from "express";
import { verifyJWT } from '../middlewares/authentication.middleware.js'
import { verifyAdmin, verifyEditor, verifyViewer } from '../middlewares/authorization.middleware.js'
import { loginUser, registerUser } from '../controllers/user.controller.js'

const router = Router();

router.route('/register').post(registerUser)

router.route('/loginUser').post(loginUser)


export default router