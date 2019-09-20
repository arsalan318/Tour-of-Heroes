const con = require('../../config/database');
const express = require('express')
const router = express.Router();


//Add city

router.post('/cities', (req, res) => {
  const {name} = req.body;
  con.query(`INSERT INTO City (name) VALUES ('${name}')`, function (err, result) {
    if (err)
      res.json({ msg: err.message });
    res.json(result)
  });
})

//get all citys

router.get('/cities', (req, res) => {
  con.query("SELECT * FROM City", function (err, result) {
    if (err)
      res.json({ msg: err.message });
    res.json(result)
  });
})

//get city by id


router.get('/cities/:id', (req, res) => {
  let id = req.params.id
  con.query(`SELECT * FROM City Where cityId=${id}`, function (err, city, fields) {
    if (err)
      res.json({ msg: err.message });;
    res.json(city)

  });
})

//city delete

router.delete('/cities/:id', (req, res) => {
  let id = req.params.id
  con.query(`DELETE FROM City Where cityId=${id}`, function (err, city, fields) {
    if (err)
      res.json({ msg: err.message });;
    res.json(city)

  });
})

//city update

router.put('/cities/:id', (req, res) => {
  let id = req.params.id
  const {name}=req.body
  con.query(`UPDATE City SET name = '${name}' WHERE cityId = '${id}'`, function (err, city) {
    if (err)
      res.json({ msg: err.message });;
    res.json(city)

  });
})
// router.get('/city/hero/:id', (req, res) => {
//   let id = req.params.id
//   con.query(`SELECT heroId FROM herocitys Where cityId=${id}`, function (err, city, fields) {
//     if (err)
//       res.json({ msg: err.message });;
//     res.json(city)
//   });
// })

module.exports = router;