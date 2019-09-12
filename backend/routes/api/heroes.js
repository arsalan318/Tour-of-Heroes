const con = require('../../config/database');
const express = require('express')
const router = express.Router();

router.get('/heroes',(req,res)=>{
    con.query("SELECT * FROM hero", function (err, result, fields) {
        if (err) throw err;
        res.json(result)
        console.log(result);
      });
})
module.exports = router;