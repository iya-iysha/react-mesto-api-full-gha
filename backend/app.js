require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const auth = require('./middlewares/auth');
const { errorHandler } = require('./middlewares/error-handler');
const { createUser, login } = require('./controllers/users');
const NotFoundError = require('./errors/NotFoundError');
const { validateCreateUser, validateLogin } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { cors } = require('./middlewares/cors');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

app.use(helmet());

app.use(rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 150,
  standardHeaders: true,
  legacyHeaders: false,
}));

app.use(express.json());

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(cors);

app.use(requestLogger);

app.use('/users', auth, require('./routes/users'));

app.use('/cards', auth, require('./routes/cards'));

app.post('/signup', validateCreateUser, createUser);

app.post('/signin', validateLogin, login);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {

});
