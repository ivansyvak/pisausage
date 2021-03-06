import * as express from 'express';
import * as bodyParser from 'body-parser';

import { userRouter } from './routes/user-route';
import { botService } from './services/bot-service';
import { AppError } from './common/app-error';
import { phraseRouter } from './routes/phrase-route';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();

  app.options('*', (req, res) => {
      res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
      res.send();
  });
});

app.use('/users', userRouter);
app.use('/phrases', phraseRouter);

app.use('/', (req, res) => {
  throw new AppError(404, '"Unknown api endpoint');
});

app.use((err, req, res: express.Response, next) => {
  if (err instanceof AppError) {
    res.status(err.code);
    res.json({...err, error: true});
  } else {
    res.status(500);
    res.json(err.toString());
  }
  
});

botService.start();
app.listen(3000);
