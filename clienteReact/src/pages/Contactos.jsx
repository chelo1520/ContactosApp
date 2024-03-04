import { contactoGet, deleteContacto, updateContacto} from "../api/axiosFetch"
import { useEffect, useState } from "react"
import { useAuth } from "../context/UsuarioProvider"
import  Filtros from "../components/Filtros"
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
      <div className="container" id="contactos">
        <Filtros contactos={contactos} eliminarContacto={eliminarContacto}/>
      </div>
  );
}
