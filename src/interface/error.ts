export type errMessageGeneric = { path: string | number; message: string };

export type IGenericErrorRespose = {
    statusCode: number;
    message: string;
    errorMessage: errMessageGeneric[];
  };
  