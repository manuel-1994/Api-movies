const { mongoose } = require("../config/database/mongo");
const {Schema} = mongoose;

const reviewsSchema = new Schema({
  authorId: String,
  authorDetails: {
    name: String,
    email: String
  },
  stars: Number,
  content: String,
  createdAt: Date,
  mediaId: String
});

const ReviewsModel = mongoose.model('reviews', reviewsSchema);

module.exports = ReviewsModel;