const {Router} = require('express');
const { validateMovie,validateReview } = require('../middleware/validateData');
const { Movies } = require("../services");

const movies = (app)=>{
  const moviesServices = new Movies();
  const router = Router();
  app.use('/api/movies', router)

  router.get('/', async(req,res)=>{
    const response = await moviesServices.getAll()
    return res.status(200).json(response)
  })

  router.get('/:_id', async(req,res)=>{
    const {_id} = req.params
    const response = await moviesServices.get({_id});
    return res.status(200).json(response)
  })

  router.get('/:id/reviews', async(req,res)=>{
    const {id} = req.params
    const response = await moviesServices.getReviews(id);
    return res.status(200).json(response)
  })

  router.post('/',validateMovie, async(req,res)=>{
    const data = req.body
    const response = await moviesServices.create(data);
    return res.status(response.success?201:400).json(response);
  })

  router.post('/:id/reviews',validateReview, async(req,res)=>{
    const{id}= req.params
    const data = req.body
    const response = await moviesServices.addReview({...data, mediaId:id})
    return res.status(response.success?201:400).json(response);
  })

  router.put('/:id',validateMovie, async(req,res)=>{
    const data = req.body;
    const {id} = req.params;
    const response = await moviesServices.update(id,data);
    return res.status(response.success?200:400).json(response);
  });

  router.put('/:id/reviews/:reviewId',validateReview, async(req,res)=>{
    const data = req.body;
    const {id,reviewId} = req.params;
    const response = await moviesServices.editReview(id,reviewId,data);
    return res.status(200).json(response);
  });

  router.delete('/:id', async(req,res)=>{
    const {id} = req.params;
    const response = await moviesServices.delete(id);
    return res.status(200).json(response)
  })

  router.delete('/:id/reviews/:reviewId', async(req,res)=>{
    const {reviewId} = req.params;
    const response = await moviesServices.deleteReview(reviewId);
    return res.status(200).json(response)
  })
} 

module.exports = movies