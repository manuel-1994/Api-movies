const mongoose = require('mongoose');
const {DB} = require('../environments');

const dbConnection = async ()=>{
    try {
      const conn = await mongoose.connect(`mongodb+srv://${DB.user}:${DB.password}@${DB.host}/${DB.database}`)
      console.log('Mongo db connected', conn.connection.host);
    } catch (error) {
      console.log(error);
    }
}

module.exports={
  dbConnection,
  mongoose
}