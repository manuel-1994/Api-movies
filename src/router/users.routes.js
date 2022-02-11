const {Router} = require('express');
const { validateUser } = require('../middleware/validateData');
const { Users } = require("../services");

const users = (app)=>{
  const usersServices = new Users();
  const router = Router();
  app.use('/api/users', router)

  router.get('/', async(req,res)=>{
    const response = await usersServices.getAll()
    return res.status(200).json(response)
  })

  router.get('/:_id', async(req,res)=>{
    const {_id} = req.params
    const response = await usersServices.get({_id});
    return res.status(200).json(response)
  })

  router.post('/',validateUser, async(req,res)=>{
    const data = req.body
    const response = await usersServices.create(data);
    return res.status(response.success?201:400).json(response)
  })

  router.put('/:id',validateUser, async(req,res)=>{
    const data = req.body;
    const {id} = req.params;
    const response = await usersServices.update(id,data);
    return res.status(response.success?200:400).json(response);
  });

  router.delete('/:id', async(req,res)=>{
    const {id} = req.params;
    const response = await usersServices.delete(id);
    return res.status(200).json(response)
  })
} 

module.exports = users