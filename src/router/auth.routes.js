const { Router } = require("express");
const { validateUser } = require("../middleware/validateData");
const { Auth } = require("../services");

const auth = (app)=>{
  const authService = new Auth();
  const router = Router()
  app.use('/api/auth', router)

  router.post('/signin', async (req, res)=>{
    const {email,password} = req.body

    const response = await authService.signIn(email, password)

    return res.status(200).cookie('token',response.token,{httpOnly:true}).json(response)
  })
  
  router.post('/signup',validateUser, async (req, res)=>{
    const data = req.body
    const response = await authService.signUp(data)

    return res.status(response.success?201:400).cookie('token',response.token,{httpOnly:true}).json(response)
  })

  router.post('/logout', async (req,res)=>{
    return res.status(200).cookie('token','',{
      httpOnly:true,
      //sameSite:"none",
      //secure:true,
      expires:new Date()
    }).json({logout: true})
  })
}

module.exports= auth