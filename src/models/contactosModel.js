import mongoose from "mongoose";
import { Schema } from "mongoose";

const Contacto = new Schema({
  numero: {
    type: String,
    require: true,
    trim: true,
    validate: {
      validator: function(v){
        return /^\d+$/.test(v); // Verifica que el valor contenga solo números
      },
      message: props => `${props.value} no es un número válido.`
    }
  },
  nombre: {
    type: String,
    require: true,
    trim: true
  },
  img: {
    type: String,
    default: "https://res.cloudinary.com/dhraq17l1/image/upload/v1708012468/nqwh3vadld0ltlgetxak.png"
  },
  usuario: {
    type: mongoose.Types.ObjectId,
    ref: "UsuarioRegister"
  }
})

const ContactoUser = mongoose.model("Contacto", Contacto)  


export default ContactoUser;