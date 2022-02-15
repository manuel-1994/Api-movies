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
          const saveData = await UsersModel.create(data)
          return {success:true, message: 'Usuario creado exitosamente',data: saveData}
        }
        return isEmailValid;
    }

    async update (id,data){
      const isEmailValid = await this.#validateEmail(data.email, id)
      
      if(isEmailValid.success){
        const updateData = await UsersModel.findByIdAndUpdate(id,data,{new:true})
        return {success:true, message: 'Usuario actualizado exitosamente',data: updateData}
      }
      
      return isEmailValid
    }

    async delete (id){
      const deleteData = await UsersModel.findByIdAndDelete(id)
      return { success:true, message: 'Usuario eliminado exitosamente',data: deleteData}
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