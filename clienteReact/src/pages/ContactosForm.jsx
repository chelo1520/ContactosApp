import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { contactoCreate, obtenerContacto, updateContacto} from "../api/axiosFetch"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"


export const ContactosForm = () => {

  const {formState: {errors}, register, handleSubmit, setValue} = useForm()
  const navigate = useNavigate()
  const params = useParams()
  const [errores, setErrores] = useState([])

  
  useEffect(() => {
    async function contactoCargado() {
      if(params.id){
        const contacto = await obtenerContacto(params.id)
        setValue(`numero`, contacto.data.numero)
        setValue(`nombre`, contacto.data.nombre)
      }
    }
    contactoCargado()
  }, [])
  


  const contactoSave = async(value) => {
    try {
      if(params.id){
        await updateContacto(params.id, value)
      }else{
        await contactoCreate(value)
      }
      navigate("/contactos")
    } catch (error) {
      setErrores(error.response.data)
      console.log(errores);
    }

    
  }



  return (
    <div  className="add-contact">
    <div className="container">
      <h1 className="mb-4">
        {params.id ? "Editar contacto" : "Agregar contacto"}
      </h1>
      <form onSubmit={handleSubmit(contactoSave)}>
        <div className="mb-3">
          <label htmlFor="numero" className="form-label">Número</label>
          <input
            type="text"
            id="numero"
            className={`form-control ${errors.numero ? 'is-invalid' : ''}`}
            {...register("numero", {
              required: "El número es requerido",
              pattern: {
                value: /^\d+$/,
                message: "Ingrese un número válido"
              }
            })}
          />
          {errors.numero && <div className="invalid-feedback">{errors.numero.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            id="nombre"
            className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
            {...register("nombre", { required: "El nombre es requerido" })}
          />
          {errors.nombre && <div className="invalid-feedback">{errors.nombre.message}</div>}
        </div>

        <button type="submit" className="btn btn-primary">
          {params.id ? "Editar" : "Agregar"}
        </button>
      </form>
    </div>
    </div>
  );
}