const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
// const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(new Error('NotFound'))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        next(new ForbiddenError('Недостаточно прав для удаления карточки'));
      } else {
        Card.deleteOne(card)
          .then(() => {
            res.send({ card });
          })
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        next(new NotFoundError('Запрашиваемая карточка не найдена'));
      } else next(err);
    });
};

module.exports.putLike = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(new Error('NotFound'))
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        next(new NotFoundError('Запрашиваемая карточка не найдена'));
      } else next(err);
    });
};

module.exports.deleteLike = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(new Error('NotFound'))
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        next(new NotFoundError('Запрашиваемая карточка не найдена'));
      } else next(err);
    });
};
