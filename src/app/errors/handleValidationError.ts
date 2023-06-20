import mongoose from 'mongoose';
import { IGenericErrorRespose, errMessageGeneric } from '../../interface/error';


const handleValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrorRespose => {
  const errors: errMessageGeneric[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    }
  );
  const statusCode = 400;
  return {
    statusCode,
    message: 'ValidationError',
    errorMessage: errors,
  };
};

export default handleValidationError;
