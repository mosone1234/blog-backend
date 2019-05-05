'use strict'

const express = require('express');
const router = express.Router();

const articleCtrl = require('../controllers/article.controller');

router.get('/api/users', articleCtrl.findAll);
router.post('/api/users', articleCtrl.create);
router.put('/api/users', articleCtrl.update);
router.get('/api/users/:id', articleCtrl.findById);
router.delete('/api/users/:id', articleCtrl.delete);

module.exports = router;

