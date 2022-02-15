const jwt = require("jsonwebtoken");

const verifyToken=(req,res,next)=>{
  const {token} = req.cookies

  if(!token){
    return res.status(403).json({message: "un token es requerido"})
  }

  try {
    const decoded = jwt.verify(token,"123456")
    const {role} = decoded
    if(role>=req.neededRole){
      req.user = decoded
      return next()
    }
    return res.status(403).json({message:"Es requerido un rol superior para acceder"})
  } catch (error) {
    return res.status(403).json({message: "Un toquen valido es requrido"})
  }
}

const isAdmin=(req,res,next)=>{
  req.neededRole = 2
  verifyToken(req,res,next)
}
const isEditor=(req,res,next)=>{
  req.neededRole = 1
  verifyToken(req,res,next)
}
const isRegular=(req,res,next)=>{
  req.neededRole = 0
  verifyToken(req,res,next)
}

module.exports = {
  isAdmin,
  isEditor,
  isRegular
}
