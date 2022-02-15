const { mongoose } = require("../config/database/mongo");
const {Schema} = mongoose

const moviesSchema = new Schema({
  title: String,
  image: String,
  overview: String,
  releaseDate: Date,
  stars: {
    type: Number,
    default: 0
  },
  numberOfVotes: {
    type: Number,
    default: 0
  },
  createdBy: String
})

const MoviesModel = mongoose.model('movies', moviesSchema);

module.exports= MoviesModel;