import express from 'express'
import {register, login, logOut, reqRefreshToken} from '../controllers/AuthController.js'
import { verifyUser } from '../utils/verifyToken.js'
const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout",verifyUser ,logOut)
router.post("/refresh", reqRefreshToken)
export default router