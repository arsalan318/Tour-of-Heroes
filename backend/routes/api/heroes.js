const con = require('../../config/database');
const express = require('express')
const router = express.Router();


//Add hero

router.post('/heroes', (req, res) => {
  const {name} = req.body;
  con.query(`INSERT INTO hero (name) VALUES ('${name}')`, function (err, result, fields) {
    if (err)
      res.json({ msg: err.message });
    res.json(result)
  });
})

//get all heroes

router.get('/heroes', (req, res) => {
  con.query("SELECT * FROM hero", function (err, result, fields) {
    if (err)
      res.json({ msg: err.message });
    res.json(result)
  });
})

//get hero by id


router.get('/heroes/:id', (req, res) => {
  let id = req.params.id
  con.query(`SELECT * FROM hero Where id=${id}`, function (err, hero, fields) {
    if (err)
      res.json({ msg: err.message });;
    res.json(hero)

  });
})

//Hero delete

router.delete('/heroes/:id', (req, res) => {
  let id = req.params.id
  con.query(`DELETE FROM hero Where id=${id}`, function (err, hero, fields) {
    if (err)
      res.json({ msg: err.message });;
    res.json(hero)

  });
})

//Hero update

router.put('/heroes/:id', (req, res) => {
  let id = req.params.id
  const {name}=req.body
  con.query(`UPDATE hero SET name = '${name}' WHERE id = '${id}'`, function (err, hero) {
    if (err)
      res.json({ msg: err.message });;
    res.json(hero)

  });
})

module.exports = router;