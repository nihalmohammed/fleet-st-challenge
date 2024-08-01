const express = require('express');

const controller = require('./controller/index');

const router = express.Router();

router.get('/:owner/:repository/commits/:oid', (req, res) => {
  controller.getCommitById(res, req.params);
});
router.get('/:owner/:repository/commits/:oid/diff', (req, res) => {
  controller.getCommitDiffById(res, req.params);
});

module.exports = router;
