import { Router, json } from 'express';
import { AppError } from '../common/app-error';
import { userService } from '../services/user-service';
import { phraseService } from '../services/phrase-service';
import { CONFIG } from '../config';

export const phraseRouter = Router();

phraseRouter.use('/', async (req, res, next) => {
  let tmpKey = req.headers.authorization;

  if (!tmpKey) {
    next(new AppError(401, 'Unauthorized'));
    return;
  }

  let requestUser = await userService.getUserByTmpKey(tmpKey);
  if (!requestUser) {
    next(new AppError(401, 'Unauthorized'));
    return;
  }

  next();
});

phraseRouter.get('/', async (req, res, next) => {
  try {
    let tmpKey = req.headers.authorization;
    let user = await userService.getUserByTmpKey(tmpKey);
    let data = await phraseService.readByUserId(user.id);

    res.json(data || {});
  } catch (e) {
    next(e);
  }
});

phraseRouter.post('/', async (req, res, next) => {
  try {
    let p = await phraseService.create(req.body);
    res.json(p);
  } catch (e) {
    next(e);
  }
});

phraseRouter.put('/:id', async (req, res, next) => {
  try {
    await phraseService.update(req.params.id, req.body);
    next();
  } catch (e) {
    next(e);
  }
});

phraseRouter.delete('/:id', async (req, res, next) => {
  let keys = req.params.id.split('.');
  await phraseService.delete(keys[0], keys[1]);
});
