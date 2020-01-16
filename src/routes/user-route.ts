import { Router } from 'express';
import { botService } from '../services/bot-service';
import { userService } from '../services/user-service';
import { AppError } from '../common/app-error';

export const userRouter = Router();

userRouter.get('/:id', async (req, res, next) => {
  try {
    let data = await userService.readOne(req.params.id);
    if (!data) {
      throw new AppError(404, "User not found");
    }
    res.json(data);
  } catch (e) {
    next(e);
  }
});

userRouter.get('/', async (req, res, next) => {
  try {
    let data = await userService.read();
    res.json(data);
  } catch (e) {
    next(e);
  }
});

userRouter.post('/', async (req, res, next) => {
  try {
    if (!req.body.tmpKey) {      
      throw new AppError(422, 'Request parameter "tmpKey" is not specified');
    }
    
    let tmpKey = botService.getTmpKey(req.body.tmpKey);
    if (!tmpKey) {
      throw new AppError(404, 'Incorrect tmpKey');
    }

    let botUser = botService.getUser(tmpKey.payload);
    if (!botUser) {
      throw new AppError(404, 'Sorry, seems like Pisausage doesn\'t know you');
    }
    
    let obj = {
      id: botUser.id,
      tmpKey: tmpKey.key
      // username: botUser.username,
      // tag: botUser.tag,
      // avatarURL: botUser.avatarURL,
      // displayAvatarURL: botUser.displayAvatarURL
    }

    let user = await userService.create(obj);

    res.statusCode = 200;
    res.json(user);
  } catch (e) {
    next(e);
  }
});

userRouter.put('/:id', async (req, res, next) => {
  try {
    await userService.update(req.params.id, req.body);
    res.json({});
  } catch (e) {
    next(e);
  }
});

userRouter.delete('/:id', async (req, res, next) => {
  try {
    await userService.delete(req.params.id);
    res.json({});
  } catch (e) {
    next(e);
  }
});
