import {
  ErrorRequestHandler,
  RequestHandler
} from 'express';

// Error Handling 404
export const errorHandlerNotFound: RequestHandler = (req, res, next) => {
  const error = new Error('Not Found');
  (error as any).status = 404;
  next(error);
};

export const errorHandler: ErrorRequestHandler = (err, req, res) => {
  return res.status(500).json({
    error: {
      name: err.name,
      message: err.message || 'Server Error',
    },
  });
};
