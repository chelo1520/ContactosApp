import {mongoose,Schema } from "mongoose";

const usuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true
  },
  username: {
    type: String,
    require: true,
    trim: true
  },
  password: {
    type: String,
    require: true
    
  }
})

const Usuario = mongoose.model("UsuarioRegister",usuarioSchema)

export default Usuario

