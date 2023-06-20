import express, { Application, NextFunction, Request, Response} from 'express';
import cors from 'cors';
import routes from './app/routes';
import globalErrorHandler from './app/middelware/globalErrorHandler';

const app: Application = express();

//parse
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// router 
app.use('/api/v1', routes);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello World!')
})

app.use(globalErrorHandler)

export default app;
