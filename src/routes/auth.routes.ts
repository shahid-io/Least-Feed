import { Router } from "express"
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/auth.controller';

const authRoutes = Router();

authRoutes.route('/').get(getUsers).post(createUser);
authRoutes.route('/:userId').get(getUser).put(updateUser).delete(deleteUser);

export default authRoutes;