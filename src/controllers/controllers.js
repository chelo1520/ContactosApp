import Usuario from "../models/registerModel.js"
import bcrypt from "bcrypt"
import tokenCreate from "../libs/jwt.js"
import jwt from "jsonwebtoken"
import TOKEN_KEY from "../libs/TOKEN_KEY.js"
import cookieParser from "cookie-parser"


export const register = async(req, res) => {
  try {
    const {email, username, password} = req.body

    //Verificar si el email ya fue registrado
    const verificar = await Usuario.findOne({email})
    if(verificar){
      return res.status(400).send(["Email en uso"])
    }

    //Encriptar contraseña y crear usuario
    const passwordHash = await bcrypt.hash(password, 10)

    //Crear usuario
    const usuarioRegistrado = new Usuario({
      email,
      username,
      password: passwordHash
    })

    //Guardar usuario en BD
    await usuarioRegistrado.save()

    //Crear token utilizando la id del usuario
    const token = await tokenCreate({id: usuarioRegistrado._id})

    //Guardar token en cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: `none`
    })


    res.send({
      email: usuarioRegistrado.email,
      username: usuarioRegistrado.username
    })


  } catch (error) {
    console.log(error);
  }
}

export const login = async(req, res) => {
  try {
    const {email, password} = req.body

    //Busca el usuario por email
    const usuarioLogin = await Usuario.findOne({email})

    //Verifica si encontro el email buscado
    if(!usuarioLogin){
      return res.status(400).send(["Email incorrecto"])
    }

    //Compara contraseña escrita con contraseña almacenada
    const contraseña = await bcrypt.compare(password, usuarioLogin.password)

    //Contraseña incorrecta
    if(!contraseña){
     return res.status(400).send(["Contraseña incorrecta"])
    }

    const token = await tokenCreate({id: usuarioLogin._id})


    res.cookie("token", token)
    res.send("Login exitoso !")
    
  } catch (error) {
    res.status(500).send(["Error interno del servidor"])
  }
}

export const logout = (req, res) => {
  res.cookie("token", "" , {
    expires: new Date(0) 
  })

  res.send("Logout exitoso")
}

export const profile = async(req, res) =>{

  const user = await Usuario.findById(req.usuario.id)

  if(!user){
    return res.status(404).send("Usuario no existe")
  }

  res.json({
    email: user.email,
    username: user.username
  })
}

export const verifyToken = async(req, res) => {
  const {token} = req.cookies

  if(!token) {
    return res.status(400).send("No hay token")
  }

  jwt.verify(token, TOKEN_KEY, async(error, user) => {
    if(error){
      console.log(error);
      return res.status(400).send("Token invalido")
    }

    const usuario = await Usuario.findById({id: user.id})

    if(!usuario){
      res.status(404).send("Usuario invalido")
    }
  })
  res.send("Token verificado")
}

