const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: [true, 'Пользователь с таким адресом уже существует'],
    required: [true, 'Поле "email" должно быть заполнено'],
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Некорректный Email',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле "password" должно быть заполнено'],
    select: false,
  },
  name: {
    type: String,
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Минимальная длина поля "about" - 2'],
    maxlength: [30, 'Максимальная длина поля "about" - 30'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function doesUserExist(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Unauthorized'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Unauthorized'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
