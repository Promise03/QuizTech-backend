import express from 'express';
import { getUsers } from '../controller/user/getAlluser.js';
import { getSingleUser } from '../controller/user/getSingleuser.js';
import { deleteUser } from '../controller/user/deleteUser.js';
import { updateUser } from '../controller/user/editUser.js';
const router = express.Router()

router.get('/alluser',  getUsers);
router.patch('/profile/:id',  updateUser);
router.get('/siguleuser/:id',  getSingleUser);
router.delete('/delete/:id',  deleteUser);


export default router