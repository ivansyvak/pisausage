import { Router } from 'express';

export const loginRouter = Router();

loginRouter.post('/', async (req, res, next) => {
  next();
});
