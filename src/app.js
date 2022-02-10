const express = require('express');
const cookie = require('cookie-parser')
const config = require('./config/environments');
const { dbConnection } = require('./config/database/mongo');
const app = express();

//Middleware
//TODO: pendiente el middlware de cors
app.use(express.json())
app.use(cookie())

//Database conection
dbConnection();

//Routes
app.get('/', (req,res)=>{
  res.send('Proyecto movives')
})

//server init
app.listen(config.PORT,()=>{
  console.log(`Application running on port: http://localhost:${config.PORT}`);
})