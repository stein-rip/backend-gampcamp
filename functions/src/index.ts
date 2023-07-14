import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import profileRouter from './routes/profileRouter';
import shoutoutRouter from './routes/shoutoutRouter';

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());
app.use("/", profileRouter);
app.use("/", shoutoutRouter);


export const api = functions.https.onRequest(app);