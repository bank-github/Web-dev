const express = require('express');
const router = express.Router();
const path = require('path');
const con = require('../../config/db');

router.get('/history',function(req,res){
    res.sendFile(path.join(__dirname,'../../views/aj/history.html'));
})

module.exports = router;