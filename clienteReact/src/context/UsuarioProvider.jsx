import { createContext , useContext, useState} from "react";
import { dataFetch } from "../api/axiosFetch.js";
import Cookies from "js-cookie"

const Usuario = createContext()

//Exporta directamente los datos del contexto
export function useAuth() {
  const contexto = useContext(Usuario);
  if (!contexto) {
    throw new Error("Error en el contexto" );
  }
  return contexto;
}

export const UsuarioProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [errores, setErrores] = useState([])
  const [cuentaAutenticada, setCuentaAutenticada] = useState(false)

  const registerData = async(usuario, type) => {

    try {
        const resp = await dataFetch(usuario, type)
        setUser(resp.config.data)
        setCuentaAutenticada(true)   
    } catch (error) {
      setErrores(error.response.data);
    }

  }


  const logout = () => {
    Cookies.remove("token")
    setCuentaAutenticada(false)
    setUser(null)
  }


  return (
    <Usuario.Provider value={{
      registerData,
      cuentaAutenticada,
      errores,
      user,
      logout
    }}>
      {children}
    </Usuario.Provider>
  )
}
