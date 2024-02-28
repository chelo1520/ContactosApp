import jwt  from "jsonwebtoken";
import TOKEN_KEY from "../libs/TOKEN_KEY.js";
import cookie from "cookie-parser";

export default function validatorToken(req, res, next){
  try {


    //Consultar token en las cookies
    const token = req.cookies.token


    if(!token){
      return res.status(500).send("Error, no existe un token")
    }

    //Verificar token
    jwt.verify(token, TOKEN_KEY, (error, user) => {
      if(error){
        return res.status(401).send("Error, token invalido")
      }

      req.usuario = user

      next()
    }) 
  } catch (error) {
    console.log(error);
    res.status(401).send({message: error.message})
  }

}