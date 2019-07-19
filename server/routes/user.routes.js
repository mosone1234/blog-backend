'use strict'

const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.get('/api/users', userController.findAll);
router.post('/api/users', userController.create);
router.put('/api/users', userController.update);
router.get('/api/users/:id', userController.findById);
router.delete('/api/users/:id', userController.delete);

router.post('/api/reset-password-init', userController.resetPasswordInit);
router.post('/api/reset-password-finish', userController.resetPasswordFinish);

module.exports = router;

