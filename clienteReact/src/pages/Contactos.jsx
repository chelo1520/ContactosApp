import { contactoGet, deleteContacto, updateContacto} from "../api/axiosFetch"
import { useEffect, useState } from "react"
import { useAuth } from "../context/UsuarioProvider"
import {Link} from "react-router-dom"

export const Contactos = () => {

  const [contactos, setContactos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const {logout} = useAuth()

  useEffect(() => {
    async function contactosPet() {
      try {
        const res = await contactoGet()

        setContactos(res.data.listaContactos)
        setIsLoading(false)

      } catch (error) {
        console.log(error);
      }
  }
  contactosPet()

  }, [])


  if(isLoading){
    return <p>Cargando...</p>
  }

  const eliminarContacto = async(id) => {
    try {
      await deleteContacto(id)
      setContactos(contactos.filter((cont) => {
        return cont._id !== id 
      }))
    } catch (error) {
      console.log(error);
    }
  }

 return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-3 g-3">
        {contactos.length !== 0 ? (
          contactos.map((cont, index) => (
            <div className="col" key={index}>
              <div className="card">
                <img src={cont.img} width="50px"  className="ms-4" alt="imagen de contacto"/>
                <div className="card-body">
                  <h5 className="card-title">Nombre: {cont.nombre}</h5>
                  <p className="card-text">Número: {cont.numero}</p>
                  <button onClick={() => eliminarContacto(cont._id)} className="btn btn-danger me-2">Eliminar</button>
                  <Link to={`/contactosForm/${cont._id}`} className="btn btn-primary">Actualizar</Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col">
            <p>No tiene contactos</p>
          </div>
        )}
      </div>
    </div>
  );
}
