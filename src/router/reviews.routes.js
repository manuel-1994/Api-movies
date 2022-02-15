const {Router} = require('express');
const { isAdmin } = require('../middleware/authValidation');
const { Reviews } = require("../services");

const reviews = (app)=>{
  const reviewsService = new Reviews();
  const router = Router();
  app.use('/api/reviews',isAdmin, router)

  router.get('/', async(req,res)=>{
    const response = await reviewsService.getAll()
    return res.status(200).json(response)
  })

  router.get('/:id', async(req,res)=>{
    const {id} = req.params
    const response = await reviewsService.get(id)
    return res.status(200).json(response)
  })

} 

module.exports = reviews