/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler } from 'express';
import config from '../../config';
import { ZodError } from 'zod';
import { errMessageGeneric } from '../../interface/error';
import handleValidationError from '../errors/handleValidationError';
import handleZodError from '../errors/handleZodError';
import ApiError from '../errors/ApiError';
import handleCasrError from '../errors/handleCastError';

// global error handler  in production environment
const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {

  let statusCode = 500;
  let message = 'some thing went wrong';
  let errorMessage: errMessageGeneric[] = [];

  if (error?.name == 'ValidationError') {
    const simplefieError = handleValidationError(error);
    statusCode = simplefieError.statusCode;
    message = simplefieError.message;
    errorMessage = simplefieError.errorMessage;
  } else if (error instanceof ZodError) {
    const simplefieError = handleZodError(error);
    statusCode = simplefieError.statusCode;
    message = simplefieError.message;
    errorMessage = simplefieError.errorMessage;
  }else if (error?.name === 'CastError') {
    // res.status(200).json({ error });
    const simplefileError = handleCasrError(error);
    statusCode = simplefileError.statusCode;
    message = simplefileError.message;
    errorMessage = simplefileError.errorMessage;
  }else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stact: config.env !== 'production' ? error?.stack : undefined,
  });
  res.status(400).json({ error: error });
  next();
};

export default globalErrorHandler;
