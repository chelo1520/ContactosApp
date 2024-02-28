import ContactoUser from "../models/contactosModel.js"


export const obtenerContactos = async(req, res) => {

  
  const listaContactos = await ContactoUser.find({usuario: req.usuario.id})

  if(!listaContactos){
    return res.status(401).send("Error al consultas contactos")
  }
  
  res.json({listaContactos})
}

export const obtenerContacto = async(req, res) => {
  const id = req.params.id

  if(!id){
    return res.status(401).send("Error al cargar tarea")
  }

  const contacto = await ContactoUser.findById(id)

  if(!contacto){
    res.status(500).send("No se encontraron contactos")
  }


  res.json(contacto)
}

export const crearContacto = async(req, res) => {

  const {numero, nombre} = req.body


  // Validar numero y caracteres maximos
  if(!numero || numero.length > 11 || isNaN(numero)) {
    return res.status(400).send(["Escriba un numero"])
  }


  //Verificar nombre
  if(!nombre){
    return res.status(400).send(["Escriba un nombre"])
  }

try {
    //Crear contacto
  const contacto = new ContactoUser({
    numero,
    nombre,
    usuario: req.usuario.id
  })

  await contacto.save()

  res.json({
    numero: contacto.numero,
    nombre: contacto.nombre,
    img: contacto.img
  })

} catch (error) {
  res.status(500).send(["Error al crear contacto"]);
}


}


export const eliminarContacto = async(req, res) => {

  const id = req.params.id
  if(!id){
    res.status(500).send("Id de contacto incorrecta")
  }

  const contacto = await ContactoUser.findByIdAndDelete(id)
  if(!contacto){
    res.status(401).send("Contacto no existe")
  }

  res.send(`Contacto "${contacto.nombre}" eliminado`)
}

export const actualizarContacto = async(req, res) => {

  const {numero, nombre} = req.body

  const id = req.params.id
  if(!id){
    res.status(500).send("Id de contacto incorrecta")
  }

  const contacto = await ContactoUser.findOneAndUpdate({_id: id}, {numero, nombre}, {new: true})

  if(!contacto){
    res.status(401).send("Contacto no existe")
  }

  return res.json(contacto)
}