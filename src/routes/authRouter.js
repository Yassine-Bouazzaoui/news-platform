const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', [
    body('username').notEmpty().withMessage('Le nom d\'utilisateur est requis'),
    body('email').isEmail().withMessage('L\'email est requis'),
    body('password').notEmpty().withMessage('Le mot de passe est requis')
], authController.register);

router.post('/login', [
    body('email').isEmail().withMessage('L\'email est requis'),
    body('password').notEmpty().withMessage('Le mot de passe est requis')
], authController.login);

module.exports = router;