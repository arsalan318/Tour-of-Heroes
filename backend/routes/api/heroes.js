const con = require('../../config/database');
const express = require('express')
const router = express.Router();


//Add hero

router.post('/heroes', (req, res) => {
  const {name} = req.body;
  con.query(`INSERT INTO Hero (name) VALUES ('${name}')`, function (err, result, fields) {
    if (err)
      res.json({ msg: err.message });
    res.json(result)
  });
})

//get all heroes

router.get('/heroes', (req, res) => {
  con.query("SELECT * FROM Hero", function (err, result, fields) {
    if (err)
      res.json({ msg: err.message });
    res.json(result)
  });
})

//get hero by id


router.get('/heroes/:id', (req, res) => {
  let id = req.params.id
  con.query(`SELECT * FROM Hero Where id=${id}`, function (err, hero, fields) {
    if (err)
      res.json({ msg: err.message });;
    res.json(hero)

  });
})

//Hero delete

router.delete('/heroes/:id', (req, res) => {
  let id = req.params.id
  con.query(`UPDATE City SET heroId = NULL WHERE heroId = '${id}'`, function (err, result, fields) {
    if (err)
      res.json({ msg: err.message });
    else{
      con.query(`DELETE FROM heroPowers Where id=${id}`, function (err, result, fields) {
        if (err)
          res.json({ msg: err.message });
        else{
          con.query(`DELETE FROM Hero Where id=${id}`, function (err, result, fields) {
            if (err)
              res.json({ msg: err.message });
            else{
              res.json({msg:"Hero Atlast Deleted"})
            }
        
          });
        }
    
      });      
    }

  });
})

//Hero update

router.put('/heroes/:id', (req, res) => {
  let id = req.params.id
  const {name}=req.body
  con.query(`UPDATE Hero SET name = '${name}' WHERE id = '${id}'`, function (err, hero) {
    if (err)
      res.json({ msg: err.message });;
    res.json(hero)

  });
})

//Add Power To Hero
router.post('/heroes/power',(req,res)=>{
  const {powerId,heroId}=req.body;
  con.query(`INSERT INTO heroPowers (heroId,powerId) VALUES ('${heroId}','${powerId}')`, function (err, result, fields) {
    if (err)
      res.json({ msg: err.message });
    res.json(result)
  });  
})


//Get Powers Of Hero
router.get('/heroes/powers/:id',(req,res)=>{
  const {id}=req.params;
  con.query(`SELECT powerId FROM heroPowers Where heroId='${id}'`,
   function (err, result, fields) {
    if (err)
      res.json({ msg: err.message });
    res.json(result)
  });  
})
router.delete('/heroes/powers/:heroId/:powerId', (req, res) => {
  let {heroId,powerId} = req.params
  con.query(`DELETE FROM heroPowers Where heroId=${heroId} and powerId=${powerId}`, function (err, hero, fields) {
    if (err)
      res.json({ msg: err.message });;
    res.json(hero)
  });
})

//Get Hero City
router.get('/heroes/city/:cid',(req,res)=>{
  const {cid}=req.params;
  con.query(`select * from City where cityId=${cid}`,
   function (err, result, fields) {
    if (err)
      res.json({ msg: err.message });
    res.json(result)
  });  
})


module.exports = router;