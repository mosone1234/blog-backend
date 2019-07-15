'use strict'

const express = require('express');
const router = express.Router();

const articleCtrl = require('../controllers/article.controller');

router.get('/api/articles', articleCtrl.findAll);
router.post('/api/articles', articleCtrl.create);
router.put('/api/articles', articleCtrl.update);
router.get('/api/articles/:id', articleCtrl.findById);
router.delete('/api/articles/:id', articleCtrl.delete);

module.exports = router;

