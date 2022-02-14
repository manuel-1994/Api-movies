const Joi = require('joi');

const movieSchemaJoi = Joi.object({
  title: Joi.string().required().max(100),
  image: Joi.string(),
  overview: Joi.string(),
  releaseDate: Joi.date(),
  stars: Joi.number().min(0),
  numberOfVotes: Joi.number().integer().min(0)
})

module.exports = movieSchemaJoi;