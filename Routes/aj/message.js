const express = require('express');
const router = express.Router();
const path = require('path');

// go to main page
router.get('/message', function (req, res) {
    res.sendFile(path.join(__dirname, "../../views/aj/message.html"));
});

module.exports = router;