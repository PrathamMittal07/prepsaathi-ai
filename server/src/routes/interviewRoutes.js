const express = require('express');
const { evaluateInterview } = require('../controllers/interview.controller');

const router = express.Router();

router.post('/evaluate', evaluateInterview);

module.exports = router;
