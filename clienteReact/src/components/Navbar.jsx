import { Link } from "react-router-dom"
import { useAuth } from "../context/UsuarioProvider"

export const Navbar = () => {

  const {cuentaAutenticada, logout} = useAuth()
  

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid d-flex justify-content-between align-items-center">
            <Link to="/" className="navbar-brand" >
              <img src="../public/book.ico" alt="icon-contactos" width="40" height="35" className="d-inline-block align-text-top"/>             
            </Link>

        <ul className="navbar-nav">
          {
            cuentaAutenticada ? (
              <div className="container-fluid d-flex">
                <li className="nav-item p-1">
                  <Link to="/contactosForm" className="nav-link links">
                    Agregar
                  </Link>
                </li>
                <li className="nav-item p-1">
                  <Link to="/contactos" className="nav-link links">
                    Mis contactos
                  </Link>
                </li>
                <li className="nav-item p-1" onClick={logout}>
                  <Link to="/" className="nav-link links">
                    Cerrar Sesion
                  </Link>
                </li>
              </div>
            ) : (
              <div className="container-fluid d-flex">
                <li className="nav-item m-1">
                  <Link to="/login"  className="nav-link links">Ingresá</Link>
                </li>
                <li className="nav-item m-1">
                  <Link to="/register" className="nav-link links">Registrarse</Link>
                </li>
              </div>
            )
          }
        </ul>
        </div>
      </nav>
    </>
  )
}
