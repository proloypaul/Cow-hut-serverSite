import express, { Application} from 'express';
import cors from 'cors';



const app: Application = express();
app.use(cors());
//parse
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;
