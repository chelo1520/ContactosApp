import jwt from "jsonwebtoken";
import TOKEN_KEY from "./TOKEN_KEY.js"

export default async function tokenCreate(payload) {

  return new Promise((resolve , reject) => {
    jwt.sign(payload, TOKEN_KEY,{expiresIn: "1d"} ,(error, token) => {
      if(error){
        reject(error)
      }
        resolve(token)
    })
  })
  
}
