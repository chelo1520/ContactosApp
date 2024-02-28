import { Router } from "express";
import {
  crearContacto,
  obtenerContactos,
  obtenerContacto,
  eliminarContacto,
  actualizarContacto
} from "../controllers/contactos.js";

import validatorToken from "../middlewares/ValidatorToken.js";

const routeC = Router()

routeC.get("/contactos", validatorToken  ,obtenerContactos)

routeC.get("/contactos/:id", validatorToken , obtenerContacto)

routeC.post("/contactos", validatorToken ,crearContacto)

routeC.delete("/contactos/:id", validatorToken ,eliminarContacto)

routeC.put("/contactos/:id",validatorToken ,actualizarContacto)

export default routeC
