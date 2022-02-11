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
          //TODO: COLOCAR delete data.role en el servicio de auth
          delete data.role
          const saveData = await UsersModel.create(data)
          return {data: saveData, success:true, message: 'Usuario creado exitosamente'}
        }
        return isEmailValid;
    }

    async update (id,data){
      const isEmailValid = await this.#validateEmail(data.email, id)
      
      if(isEmailValid.success){
        const updateData = await UsersModel.findByIdAndUpdate(id,data,{new:true})
        return {data: updateData, success:true, message: 'Usuario actualizado exitosamente'}
      }
      
      return isEmailValid
    }

    async delete (id){
      const deleteData = await UsersModel.findByIdAndDelete(id)
      return {data: deleteData, success:true, message: 'Usuario eliminado exitosamente'}
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