import express from 'express';
import { userRouters } from '../modules/user/user.router';
import { cowRouters } from '../modules/cow/cow.router';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/user',
    route: userRouters,
  },
  {
    path: '/cow',
    route: cowRouters,
  },

];

moduleRoutes.forEach(routes => router.use(routes.path, routes.route))

export default router;