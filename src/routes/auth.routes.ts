import { Router } from "express"
import { getUsers, getUser, createUser, updateUser, deleteUser,signin } from '../controllers/auth.controller';

const authRoutes = Router();

authRoutes.route('/').get(getUsers).post(createUser);
authRoutes.route('/:userId').get(getUser).put(updateUser).delete(deleteUser);
authRoutes.route('/signin').post(signin);
export default authRoutes;