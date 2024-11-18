import dotenv from 'dotenv';
dotenv.config();

import cors from "cors";
import express from "express";

import { router } from './router.js';

export const api = express();

api.use(express.urlencoded({ extended: false }));
api.use(express.json());

api.use(cors());

api.use('/task', router);

api.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
