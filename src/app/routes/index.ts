import express from 'express';
import { userRouters } from '../modules/user/user.router';
import { cowRouters } from '../modules/cow/cow.router';
import { authRouters } from '../modules/auth/auth.router';
import { orderRouters } from '../modules/order/order.router';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRouters,
  },
  {
    path: '/cows',
    route: cowRouters,
  },
  {
    path: '/auth',
    route: authRouters,
  },
  {
    path: '/order',
    route: orderRouters,
  },

];

moduleRoutes.forEach(routes => router.use(routes.path, routes.route))

export default router;