const { usersSchemaJoi, movieSchemaJoi, reviewsSchemaJoi } = require("../schemas");

const validateData = (schema, req, res, next) =>{
  const isValid = schema.validate(req.body);
 
  if(isValid.error){
    return res.status(400).json({
      success: false, 
      message: isValid.error.details[0].message
    });
  };

  return next();

};

const validateUser = (req,res,next)=> validateData(usersSchemaJoi,req,res,next);
const validateMovie = (req,res,next)=> validateData(movieSchemaJoi,req,res,next);
const validateReview = (req,res,next)=> validateData(reviewsSchemaJoi,req,res,next);

module.exports ={
  validateUser,
  validateMovie,
  validateReview
}