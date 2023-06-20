import express from 'express';
import { userRouters } from '../modules/user/user.router';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/user',
    route: userRouters,
  },
];

moduleRoutes.forEach(routes => router.use(routes.path, routes.route))

export default router;