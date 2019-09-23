const con = require('../../config/database');
const express = require('express')
const router = express.Router();


//Add Hero
router.put('/cities/addHero', (req, res) => {
  const {hid,cid,pcid}=req.body
  console.log(hid,cid,pcid)
  con.query(`UPDATE City SET heroId='${hid}' where cityId='${cid}'`, function (err, result, fields) {    
  if (err)
      res.json({ msg: err.message });
    else{
      con.query(`UPDATE Hero SET cityId='${cid}' where id='${hid}'`, function (err, result, fields) {
        if (err)
          res.json({ msg: err.message });
        else{
          if(pcid){
            con.query(`UPDATE City SET heroId=NULL where cityId='${pcid}'`, function (err, result, fields) {
              if (err)
                res.json({ msg: err.message });
              res.json(result)
            })
          }
        }
      });
    }
  });
})
//Add Hero
router.put('/cities/removeHero', (req, res) => {
  const {hid,cid}=req.body
  con.query(`UPDATE Hero SET cityId=NULL where id='${hid}'`, function (err, result, fields) {
    if (err)
      res.json({ msg: err.message });
    else{
      con.query(`UPDATE City SET heroId=NULL where cityId='${cid}'`, function (err, result, fields) {
        if (err)
          res.json({ msg: err.message });
        res.json(result)
      });
    }
  });
})
//Get Assigned Hero
router.get('/cities/assignedHero/:cid', (req, res) => {
  const {cid}=req.params;
  con.query(`SELECT * FROM Hero where cityId=${cid}`, function (err, result) {
    if (err)
    res.json({ msg: err.message });
    res.json(result)
  });
})

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