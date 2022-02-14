const ReviewsModel = require("../models/reviews");

class Reviews{
  async getAll (data){
    return await ReviewsModel.find(data)
  } 

  async get (data){
    return await ReviewsModel.findOne(data).exec()
  }

  async create (data){ 
    const isReview = await this.#validateReview(data.authorId)
    if(isReview.success){
      const saveData = await ReviewsModel.create(data)
      return {data: saveData, success:true, message: 'comentario creado exitosamente'}
    }
    return isReview
  }

  async update (id,data){
    const updateData = await ReviewsModel.findByIdAndUpdate(id,data, {new: true})
    return {data: updateData, success:true, message: 'Comentario actualizado exitosamente'}
  }

  async delete (id){
    const deleteData = await ReviewsModel.findByIdAndDelete(id)
    return {data: deleteData, success:true, message: 'Comentario eliminado exitosamente'}
  }

  async #validateReview (authorId){
    const isReview = await this.get({authorId})
    
    if(isReview){
      return {success: false, message:'Ya tiene un comentario registrado en esta pelicula'}
    }
    return {success: true, message: 'Comentario valido'}
  }
}
module.exports = Reviews;