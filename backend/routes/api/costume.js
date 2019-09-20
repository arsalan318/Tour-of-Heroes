const con = require('../../config/database');
const express = require('express')
const router = express.Router();


//Add costume

router.post('/costume', (req, res) => {
  const {name} = req.body;
  con.query(`INSERT INTO Costume (name) VALUES ('${name}')`, function (err, result) {
    if (err)
      res.json({ msg: err.message });
    res.json(result)
  });
})

//get all costumes

router.get('/costume', (req, res) => {
  con.query("SELECT * FROM Costume", function (err, result) {
    if (err)
      res.json({ msg: err.message });
    res.json(result)
  });
})

//get costume by id


router.get('/costume/:id', (req, res) => {
  let id = req.params.id
  con.query(`SELECT * FROM Costume Where costumeId=${id}`, function (err, costume, fields) {
    if (err)
      res.json({ msg: err.message });;
    res.json(costume)

  });
})

//costume delete

router.delete('/costume/:id', (req, res) => {
  let id = req.params.id
  con.query(`DELETE FROM Costume Where costumeId=${id}`, function (err, costume, fields) {
    if (err)
      res.json({ msg: err.message });;
    res.json(costume)

  });
})

//costume update

router.put('/costume/:id', (req, res) => {
  let id = req.params.id
  const {name}=req.body
  con.query(`UPDATE Costume SET name = '${name}' WHERE costumeId = '${id}'`, function (err, costume) {
    if (err)
      res.json({ msg: err.message });;
    res.json(costume)

  });
})


module.exports = router;