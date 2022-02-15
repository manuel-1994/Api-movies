const auth = require('./auth.routes');
const movies = require('./movies.routes');
const reviews = require('./reviews.routes');
const users = require('./users.routes')

const router = (app) =>{
  users(app);
  movies(app);
  reviews(app);
  auth(app)
}

module.exports = router;