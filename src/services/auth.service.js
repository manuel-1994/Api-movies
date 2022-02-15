const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
const Users = require("./users.service");

class Auth{
  constructor(){
    this.usersService = new Users()
  }

  async signIn(email,password){
    const user = await this.usersService.get({email});
    const successPassword = bcrypt.compare(password, user.password)
    if(user && successPassword){
      const data = user.toObject();
      delete data.password;
      delete data.__v;
      const token = this.#generateToken(data)
      return {success:true,data,token}
    }
    return {success: false, message: 'Las credenciales no coinciden'}
  }

  async signUp(userData){
    delete userData.rol
    const password = await this.#hashPassword(userData.password)
    const user = await this.usersService.create({...userData,password})
    if(user.success){
      const data = user.data.toObject()
      delete data.password;
      delete data.__v;
      const token = this.#generateToken(data)
      return {...user, data,token}
    }
    return user
  }

   #generateToken (user){
      return jwt.sign(user,'123456', {expiresIn:'1d'})
  }

  async #hashPassword(password){
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)
    return hash
  }
}

module.exports = Auth