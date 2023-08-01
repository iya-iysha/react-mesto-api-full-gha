const router = require('express').Router();
const { validateCreateCard, validateGetCardById } = require('../middlewares/validation');

const {
  getCards, createCard, deleteCard, putLike, deleteLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', validateCreateCard, createCard);
router.delete('/:cardId', validateGetCardById, deleteCard);
router.put('/:cardId/likes', validateGetCardById, putLike);
router.delete('/:cardId/likes', validateGetCardById, deleteLike);

module.exports = router;
