import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { UserRoutes } from '../modules/User/user.route';
import { EventRoutes } from '../modules/Event/event.route';
import { EventRegistrationRoutes } from '../modules/Event-Registration/eventReg.route';
import { ReviewRoutes } from '../modules/Review/review.route';

const router = Router();

const moduleRoute = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/events',
    route: EventRoutes,
  },
  {
    path: '/event-registration',
    route: EventRegistrationRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
];

// route loop
moduleRoute.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
