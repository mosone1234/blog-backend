'use strict'

const express = require('express');
const router = express.Router();
const auth = require('../services/auth.service');
const userController = require('../controllers/user.controller');
const req = { 'role': 'Admin' };

router.get('/api/users', auth.verifyToken, userController.findAll);
router.post('/api/users', auth.verifyToken, userController.create);
router.put('/api/users', auth.verifyToken, userController.update);
router.get('/api/users/:id', auth.verifyToken, userController.findById);
router.delete('/api/users/:id', auth.verifyToken, userController.delete);

router.post('/api/reset-password-init', userController.resetPasswordInit);
router.post('/api/reset-password-finish', userController.resetPasswordFinish);

module.exports = router;

