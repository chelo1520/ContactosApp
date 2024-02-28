import {Navigate, Outlet} from "react-router-dom"
import { useAuth } from "./context/UsuarioProvider"



export const ProtectRoutes = () => {


  const {cuentaAutenticada} = useAuth()


  if(!cuentaAutenticada) return <Navigate to="/" replace/>


  return <Outlet/>

}
