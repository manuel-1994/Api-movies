const Joi = require('joi');

const movieSchemaJoi = Joi.object({
  title: Joi.string().required().max(100),
  image: Joi.string(),
  overview: Joi.string().required(),
  releaseDate: Joi.date(),
  stars: Joi.number().min(0).max(5),
  numberOfVotes: Joi.number().integer()
})

module.exports = movieSchemaJoi;