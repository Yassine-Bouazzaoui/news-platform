const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const newsController = require('../controllers/newsController');

router.get('/', newsController.getAllNews);
router.get('/:id', newsController.getNewsById);
router.post('/create', newsController.createNews);

router.put(
    '/:id',
    [
        body('title').notEmpty().withMessage('Le titre est requis'),
        body('body').notEmpty().withMessage('Le contenu est requis')
    ],
    newsController.updateNews
);
router.delete('/:id', newsController.deleteNews);

module.exports = router;