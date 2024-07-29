import { Router } from 'express';

import { UserController } from '../controllers/product';
import { checkAuth } from '../middlewares/checkAuth';
import { checkIsAdmin } from '../middlewares/checkIsAdmin';
import validBodyRequest from '../middlewares/validBodyRequest';
import { loginSchema, registerSchema } from '../validations/auth.validation';

const authRouter = Router();
authRouter.post(
  '/register',
  validBodyRequest(registerSchema),
  UserController.Sign_Up
);
authRouter.post(
  '/login',
  validBodyRequest(loginSchema),
  UserController.Sign_In
);
authRouter.get(
  '/check-auth',
  checkAuth,
  checkIsAdmin,
  UserController.Check_Authorize
);
export default authRouter;
