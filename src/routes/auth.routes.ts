import { Router } from "express"
import { getUsers, getUser, createUser, updateUser, deleteUser,signin } from '../controllers/auth.controller';
import { checkAuth } from '../middleware/auth.middleware'
const authRoutes = Router();

authRoutes.route('/').get(getUsers).post(createUser);
authRoutes.route('/:userId').get(getUser);
authRoutes.route('/:userId').put(updateUser);
authRoutes.route('/:userId').delete(deleteUser);
authRoutes.route('/signin').post(signin);
export default authRoutes;