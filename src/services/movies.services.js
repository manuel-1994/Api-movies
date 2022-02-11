const MoviesModel = require("../models/movies.model");

class Movies{
    
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
}

module.exports = Movies;