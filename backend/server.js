const express = require('express');
const bodyParser = require('body-parser');
const con = require('./config/database');
const cors = require('cors');

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

const app = express();


//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors(corsOptions));

app.use('/api', require('./routes/api/heroes'));
app.use('/api', require('./routes/api/powers'));

const PORT =8080;

app.listen(PORT, console.log(`Server started at port ${PORT}`));
