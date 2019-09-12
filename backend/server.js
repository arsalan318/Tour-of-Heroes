const express = require('express');
const bodyParser = require('body-parser');
const con = require('./config/database');

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

const app = express();


//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', require('./routes/api/heroes'));

const PORT =5000;

app.listen(PORT, console.log(`Server started at port ${PORT}`));
