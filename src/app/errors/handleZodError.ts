import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorRespose, errMessageGeneric } from '../../interface/error';


const handleZodError = (error: ZodError): IGenericErrorRespose => {
  const errors: errMessageGeneric[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue.path.length],
      message: issue.message,
    };
  });

  const statusCode = 400;
  return {
    statusCode,
    message: 'ZodError',
    errorMessage: errors,
  };
};
export default handleZodError;
