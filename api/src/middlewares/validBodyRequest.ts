import { NextFunction, Request, Response } from 'express';
import { Schema, ValidationErrorItem } from 'joi';

const validBodyRequest =
  (schema: Schema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = await schema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map(
          (item: ValidationErrorItem) => item.message
        );
        return res.status(400).json({
          message: 'Invalid body request!',
          errors,
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
export default validBodyRequest;
