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
//Get Assigned Hero
router.get('/costume/assignedHero/:cid', (req, res) => {
  const {cid}=req.params;
  con.query(`SELECT * FROM Hero where costumeId=${cid}`, function (err, result) {
    if (err)
    res.json({ msg: err.message });
    res.json(result)
  });
})


//Add hero costume
router.put('/costume/hero', (req, res) => {
  console.log(req.body)
  const {hid,cid}=req.body
  con.query(`UPDATE Hero SET costumeId = '${cid}' WHERE id = '${hid}'`, function (err, costume) {
    if (err)
      res.json({ msg: err.message });;
    res.json(costume)

  });
})

//Remove Costume
router.put('/costume/hero/remove', (req, res) => {
  const {hid}=req.body
  con.query(`UPDATE Hero SET costumeId = NULL WHERE id = '${hid}'`, function (err, costume) {
    if (err)
      res.json({ msg: err.message });;
    res.json(costume)

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