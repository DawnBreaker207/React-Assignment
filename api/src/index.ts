import express from 'express';
import router from './routes';
import { PORT } from './utils/env';
import cors from 'cors';
import connect from './databases/connect.db';
import { errorHandler, errorHandlerNotFound } from './utils/errorHandler';
import morgan from 'morgan';

const app = express();
//! Init Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
//! Init Router
app.use('/api/v1', router);
//! Init Database
connect();
//! Error Handling
app.use(errorHandlerNotFound, errorHandler);
app.listen(PORT, () => console.log(`Listen on port 8888`));
