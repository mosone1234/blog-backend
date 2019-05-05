const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.get('/api/users', userController.findAll);
router.post('/api/users', userController.create);
router.put('/api/users', userController.update);
router.get('/api/users/:id', userController.findById);
router.delete('/api/users/:id', userController.delete);

module.exports = router;

