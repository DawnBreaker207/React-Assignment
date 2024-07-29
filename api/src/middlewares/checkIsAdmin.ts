import { RequestHandler } from 'express';

export const checkIsAdmin: RequestHandler = async (req, res, next) => {
  try {
    if (req.user.roles !== 'admin') {
      return res.status(403).json({
        message: 'Permission denied !',
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};
