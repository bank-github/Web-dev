const express = require('express');
const router = express.Router();
// const path = require('path');
const con = require('../config/db');

// ! get all data in borrow and get data from FK 
router.get('/borrows', function (req, res) {
    const query = `
    SELECT borrow.*, assets.*,user.name FROM borrow 
    JOIN assets ON borrow.asset_id = assets.asset_id
    JOIN user ON borrow.user_id = user.user_id;
    `;
    con.query(query, (err, results) => {
      if (err) {
        console.error('Error querying MySQL:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(results);
        // console.log(results);
      }
    });
  })

  // borrow asset
  router.post('/borrow', function (req, res) {
    if (req.session.userID) {
        const userID = req.session.userID;
        // const userID = 1;
        const { brDate, rtDate, asset_id } = req.body;
        // console.log(brDate + rtDate + asset_id)
        const sql = `INSERT INTO borrow (borrow_date, return_date, status, user_id, asset_id) VALUES (?, ?, 1, ?, ?)`;
        con.query(sql, [brDate, rtDate, userID, asset_id], function (err, result) {
            if (err) {
                // console.error(err);
                res.status(500).send("Server error insert data!");
            } else {
                const assetUpdate = `UPDATE assets SET status = 0 WHERE asset_id = ?`;
                con.query(assetUpdate, [asset_id], function (err, result) {
                    if (err) {
                        res.status(500).send("Server error update data!");
                    } else {
                        res.send('success!');
                    }
                })

            }
        });
    } else {
        res.status(500).send('Session Expried!')
    }
})

// ! change message & status in borrow
router.post('/borrows/:borrow_id' ,function (req,res) {
    const borrow_id = req.params.borrow_id;
    const update = req.body;
    const query = `UPDATE borrow SET status = ?, message = ? WHERE borrow_id = ? `; 
    con.query(query, [update.status,update.message,borrow_id] , function (err,result) {
        if (err) {
            console.error(err);
            return res.status(500).send('Database server error');
        }else if(result.affectedRows != 1){
            console.error('Row update is not 1');
            return res.status(500).send('Update failed');

        }else{
            res.send('Update succesfully');
        }
        
    })

})


  module.exports = router