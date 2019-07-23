'use strict'

const express = require('express');
const router = express.Router();
const auth = require('../services/auth.service');
const articleCtrl = require('../controllers/article.controller');

router.get('/api/articles', articleCtrl.findAll);
router.post('/api/articles', auth.verifyToken, articleCtrl.create);
router.put('/api/articles', auth.verifyToken, articleCtrl.update);
router.get('/api/articles/:id', articleCtrl.findById);
router.delete('/api/articles/:id', auth.verifyToken, articleCtrl.delete);

module.exports = router;

