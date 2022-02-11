const movies = require('./movies.routes');
const users = require('./users.routes')

const router = (app) =>{
  users(app);
  movies(app);
}

module.exports = router;