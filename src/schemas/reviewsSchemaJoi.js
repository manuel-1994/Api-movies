const Joi = require("joi");

const reviewsSchemaJoi = Joi.object({
  authorId: Joi.string(),
  authorDetails: Joi.object({
    name: Joi.string(),
    email: Joi.string().email()
  }),
  stars: Joi.number().required().min(0).max(5),
  content: Joi.string().required(),
  createdAt: Joi.date(),
  mediaId: Joi.string()
});

module.exports = reviewsSchemaJoi;