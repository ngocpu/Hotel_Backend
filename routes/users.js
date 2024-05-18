import express from'express'
import {updateUser, deleteUser, getUser, getUsers, createUser} from '../controllers/UserController.js'
import {verifyUser, verifyAdmin} from '../utils/verifyToken.js'
const router = express.Router();
//UPDATE
router.post("/new-user", verifyAdmin, createUser)
router.put("/:id", verifyUser, verifyAdmin, updateUser);

//DELETE
router.delete("/:id", verifyUser, verifyAdmin, deleteUser);

//GET
router.get("/:id", verifyUser, getUser);

//GET ALL
router.get("/",verifyAdmin, getUsers);
export default router