const express = require('express');
const cookie = require('cookie-parser')
const config = require('./config/environments');
const { dbConnection } = require('./config/database/mongo');
const router = require('./router');
const app = express();

//Middleware
//TODO: pendiente el middlware de cors
app.use(express.json())
app.use(cookie())

//Database conection
dbConnection();

//laoad Routes
router(app)

//server init
app.listen(config.PORT,()=>{
  console.log(`Application running on port: http://localhost:${config.PORT}`);
})