const express = require('express');
const router = express.Router();
const path = require('path');
const con = require('../../config/db');

// go to main page
router.get('/profile', function (req, res) {
    if (req.session.role == '1') {
        res.sendFile(path.join(__dirname, "../../views/aj/profile.html"));
    } else {
        res.redirect('/login');
    }
});

module.exports = router;