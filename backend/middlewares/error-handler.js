const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  // if (isCelebrateError(err)) {
  //   const celebrateError = new ValidationError('Неверный формат данных');
  //   res.status(celebrateError.statusCode).send({ message: celebrateError.message });
  // } else {
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  // }
  next();
};

module.exports = { errorHandler };
