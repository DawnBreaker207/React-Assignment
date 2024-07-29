import { RequestHandler } from 'express';

import { User } from '../models/Product';
import { verifyToken } from '../utils/jwt';
import { UserType } from '../interfaces/User';

export const checkAuth: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(' ')[1];

    if (!token) {
      return res.status(400).json({
        message: '"Token invalid"',
      });
    }

    const decode = verifyToken(token) as { _id?: string };
    if (!decode) {
      return res.status(400).json({
        message: 'Token invalid',
      });
    }

    const user: UserType | null = await User.findById(decode._id);
    if (user) {
      req.user = user;
    }

    next();
  } catch (error) {
    next(error);
  }
};
