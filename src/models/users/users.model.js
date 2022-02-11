const { mongoose } = require("../../config/database/mongo");
const {Schema} = mongoose

const usersSchema = new Schema ({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  createdAt: {
    type: Date,
    default: new Date()
  },
  role: {
    type: Number,
    default: 0,
  },
})

const UsersModel = mongoose.model('users', usersSchema)

module.exports = UsersModel