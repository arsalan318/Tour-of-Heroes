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
//Add Hero
router.post('/cities/addHero', (req, res) => {
  console.log(req.body);
  const {hid,cid}=req.body
  con.query(`INSERT INTO Hero (cityId) VALUES ('${cid}')`, function (err, result, fields) {
    if (err)
      res.json({ msg: err.message });
    else{
      con.query(`INSERT INTO City (heroId) VALUES ('${hid}')`, function (err, result, fields) {
        if (err)
          res.json({ msg: err.message });
        res.json(result)
      });
    }
  });
})
//UnAssigned City
router.get('/cities/hero', (req, res) => {
  con.query("SELECT * FROM City where heroId is NULL", function (err, result) {
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



module.exports = router;