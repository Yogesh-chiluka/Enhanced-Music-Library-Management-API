import { Router } from "express";
import { verifyJWT } from '../middlewares/authentication.middleware.js'
import { verifyAdmin, verifyEditor, verifyViewer } from '../middlewares/authorization.middleware.js'
import { registerUser } from '../controllers/user.controller.js'

const router = Router();

router.route('/register').post(registerUser)

router.route('/test').get(verifyJWT, (req, res) => {
    res.send('<h1>Hello</h1>');
});

router.route('/testAdmin').get(verifyJWT, (req, res) => {
    res.send('<h1>Hello testAdmin</h1>');
});

router.route('/testEditor').get(verifyJWT, (req, res) => {
    res.send('<h1>Hello testEditor</h1>');
});

router.route('/testViewer').get(verifyJWT, (req, res) => {
    res.send('<h1>Hello testViewer</h1>');
});

export default router