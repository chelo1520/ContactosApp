import { useState} from "react"
import { Link } from "react-router-dom"

const Filtros = ({contactos, eliminarContacto}) => {

  const [search, setSearch] = useState("")

  const buscador = (e) => {
    setSearch(e.target.value)
  }


  const datosFiltrados = contactos.filter((dato) => {
    const nombre = search.trim() === "" || dato.nombre.toLowerCase().includes(search.toLowerCase())
    return nombre
  })



  return (
    <div className="container" id="miscontactos">
      <div className="row row-cols-1 row-cols-md-3 g-3">
        <input type="text" value={search} onChange={buscador} className="form-control m-0" placeholder="Busque nombre..."/>
        {datosFiltrados.length !== 0 ? (
          datosFiltrados.map((cont, index) => (
            <div className="col" key={index}>
              <div className="card">
                <img src={cont.img} width="50px"  className="ms-4" alt="imagen de contacto"/>
                <div className="card-body">
                  <h5 className="card-title">Nombre: {cont.nombre}</h5>
                  <p className="card-text">Número: {cont.numero}</p>
                  <button onClick={() => eliminarContacto(cont._id)} className="btn btn-danger me-2">Eliminar</button>
                  <Link to={`/contactosForm/${cont._id}`} className="btn btn-primary">Editar</Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col">
            <p>No tiene contactos !</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Filtros