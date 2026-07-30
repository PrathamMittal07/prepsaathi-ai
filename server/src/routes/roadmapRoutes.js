const express = require('express');
const router = express.Router();
const roadmapController = require('../controllers/roadmapController');

router.get('/progress', roadmapController.getProgress);
router.patch('/progress', roadmapController.updateTopicStatus);
router.patch('/notes', roadmapController.saveTopicNote);

module.exports = router;
