module.exports = {
  PORT: process.env.PORT,
  DB:{
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DATABASE
  }
}