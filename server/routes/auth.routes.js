'use strict'

const express = require('express');
const router = express.Router();

const authCtrl = require('../controllers/auth.controller');

router.post('/api/register', authCtrl.signup);
router.post('/api/authenticate', authCtrl.signin);

module.exports = router;