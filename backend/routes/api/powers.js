const con = require('../../config/database');
const express = require('express')
const router = express.Router();


//Add power

router.post('/powers', (req, res) => {
  const {name} = req.body;
  con.query(`INSERT INTO powers (name) VALUES ('${name}')`, function (err, result, fields) {
    if (err)
      res.json({ msg: err.message });
    res.json(result)
  });
})

//get all powers

router.get('/powers', (req, res) => {
  con.query("SELECT * FROM powers", function (err, result, fields) {
    if (err)
      res.json({ msg: err.message });
    res.json(result)
  });
})

//get power by id


router.get('/powers/:id', (req, res) => {
  let id = req.params.id
  con.query(`SELECT * FROM powers Where id=${id}`, function (err, power, fields) {
    if (err)
      res.json({ msg: err.message });;
    res.json(power)

  });
})

//power delete

router.delete('/powers/:id', (req, res) => {
  let id = req.params.id
  con.query(`DELETE FROM powers Where id=${id}`, function (err, power, fields) {
    if (err)
      res.json({ msg: err.message });;
    res.json(power)

  });
})

//power update

router.put('/powers/:id', (req, res) => {
  let id = req.params.id
  const {name}=req.body
  con.query(`UPDATE powers SET name = '${name}' WHERE id = '${id}'`, function (err, power) {
    if (err)
      res.json({ msg: err.message });;
    res.json(power)

  });
})

module.exports = router;