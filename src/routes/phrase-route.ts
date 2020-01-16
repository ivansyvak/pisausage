import { Router, json } from 'express';
import { AppError } from '../common/app-error';
import { userService } from '../services/user-service';
import { phraseService } from '../services/phrase-service';
import { CONFIG } from '../config';

export const phraseRouter = Router();

phraseRouter.use('/', async (req, res, next) => {
  if (req.method == 'OPTIONS') {
    next();
    return;
  }

  let tmpKey = req.body.tmpKey;

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

phraseRouter.post('/list', async (req, res, next) => {
  try {
    let tmpKey = req.body.tmpKey;
    let user = await userService.getUserByTmpKey(tmpKey);
    let data = await phraseService.readByUserId(user.id);

    res.json(data || []);
  } catch (e) {
    next(e);
  }
});

phraseRouter.post('/create', async (req, res, next) => {
  try {
    let p = await phraseService.create(req.body);
    res.json(p);
  } catch (e) {
    next(e);
  }
});

phraseRouter.post('/update', async (req, res, next) => {
  try {
    await phraseService.update(req.body);
    res.json({});
  } catch (e) {
    next(e);
  }
});

phraseRouter.post('/delete', async (req, res, next) => {
  try {
    await phraseService.delete(req.body.key, req.body.id);
    res.json({});
  } catch (e) {
    next(e);
  }
});
