const express = require('express');
const session = require('express-session');
const app = express();
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
);

//env
require('dotenv').config({path: __dirname + '/.env'});

//passport 
require('./config/passport')
//database
require('./database/db')

//body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/collection',require('./routes/collection.js'));
app.use('/api/schedule',require('./routes/schedule'));
app.use('/api/user',require('./routes/user'));

//port 
const PORT = process.env.PORT 
app.listen(PORT,function(){
  console.log("CONNECT TO " + PORT);
})