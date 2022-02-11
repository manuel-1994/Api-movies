const { UsersModel } = require("../models");

class Users{
    
  async getAll (){
      return await UsersModel.find({})
    } 

    async get (data){
      return await UsersModel.findOne(data).exec()
    }
  
    async create (data){
        const isEmailValid = await this.#validateEmail(data.email)
        
        if(isEmailValid.success){
          const saveUser = await UsersModel.create(data)
          return {data: saveUser, success:true, message: 'Usuario creado exitosamente'}
        }
        return isEmailValid;
    }

    async update (id,data){
      const isEmailValid = await this.#validateEmail(data.email, id)
      
      if(isEmailValid.success){
        const updateUser = await UsersModel.findByIdAndUpdate(id,data,{new:true})
        return {data: updateUser, success:true, message: 'Usuario actualizado exitosamente'}
      }
      
      return isEmailValid
    }

    async delete (id){
      const deleteUser = await UsersModel.findOneAndDelete(id)
      return {data: deleteUser, success:true, message: 'Usuario eliminado exitosamente'}
    }

    async #validateEmail (email, id){
      const isUser = await this.get({email})
      
      if(isUser){
        return (isUser.id === id)
        ?{success: true, message:'El correo actual es valido'}
        :{success:false, message:'El correo ya existe'}
      }

      return {success: true, message: 'Correo valido'}
    }
}

module.exports = Users;