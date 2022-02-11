const users = require('./users.routes')

const router = (app) =>{

  users(app)

}

module.exports = router;