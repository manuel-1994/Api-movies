const MoviesModel = require("../models/movies.model");
const  Users  = require("./users.services");
const Reviews = require("./reviews.services");

class Movies{
  constructor(){
    this.userService = new Users()
    this.reviewsServices = new Reviews()
  }
    
  async getAll (){
    return await MoviesModel.find({})
  } 

  async get (data){
    return await MoviesModel.findOne(data).exec()
  }

  async create (data){ 
      const isMovie = await this.#validateMovie(data.title);

      if(isMovie.success){
        const saveData = await MoviesModel.create(data)
        return {data: saveData, success:true, message: 'Pelicula creada exitosamente'}
      }

      return isMovie
  }

  async update (id,data){
      const isMovie = await this.#validateMovie(data.title,id)
      if(isMovie.success){
        const updateData = await MoviesModel.findByIdAndUpdate(id,data,{new:true})
        return {data: updateData, success:true, message: 'Pelicula actualizada exitosamente'}
      }

      return isMovie;
  }

  async delete (id){
    const deleteData = await MoviesModel.findByIdAndDelete(id)
    return {data: deleteData, success:true, message: 'Pelicula eliminada exitosamente'}
  }

  async #validateMovie (title,id){
    const isMovie = await this.get({title})
    
    if(isMovie){
      return (isMovie.id === id)
      ?{success: true, message:'Pelicula valida'}
      :{success:false, message:'La pelicula ya existe'}
    }

    return {success: true, message: 'Pelicula valida'}
  }

  async #Stars(data, option){
    const movie = await this.get({_id: data.mediaId})
    switch (option) {
      case 'add':
        movie.stars += data.stars
        movie.numberOfVotes++
        break;
      case 'sub':
        movie.stars -= data.stars
        movie.numberOfVotes--
        break;
      default:
        const review = await this.reviewsServices.get({_id: data.reviewId})
        let result;
        
        if(data.stars >= review.stars){
          result = data.stars - review.stars
          movie.stars += result
        }else{
          result = review.stars - data.stars
          movie.stars -= result
        }
        break;
    }
    return await this.update(data.mediaId, movie)
  }

// reviews services

  async getReviews(mediaId){
    return await this.reviewsServices.getAll({mediaId})
  }

  async addReview(data){
    const author = await this.userService.get({_id: data.authorId})   
   
    data.authorDetails = {
      name: author.firstName,
      email: author.email
    };
    const saveData = await this.reviewsServices.create(data)
    if(saveData.success){
      await this.#Stars(saveData.data, 'add')
    }
    
    return saveData
  }

  async editReview(mediaId,reviewId,data){
    await this.#Stars({...data,mediaId, reviewId})
    return await this.reviewsServices.update(reviewId,data)
  }

  async deleteReview(reviewId){
    const deleteData = await this.reviewsServices.delete(reviewId)
    await this.#Stars(deleteData.data,'sub')
    return deleteData
  }
}

module.exports = Movies;