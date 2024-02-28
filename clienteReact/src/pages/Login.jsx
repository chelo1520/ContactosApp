import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/UsuarioProvider"
import { useEffect } from "react"


export const Login = () => {

  const {formState: {errors}, register, handleSubmit} = useForm()
  const {registerData, cuentaAutenticada, errores} = useAuth()

  const loginSubmit = async(user) =>  registerData(user, "login")


  const navigate = useNavigate()

  useEffect(() => {
    if(cuentaAutenticada) navigate("/contactosForm")
  }, [cuentaAutenticada])

  return (
    <div className="container add-contact">
      <form className="row g-3" onSubmit={handleSubmit(loginSubmit)}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input 
            type="email"
            id="email"
            placeholder="Ingrese su email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            {...register("email", { required: "El email es requerido" })}
          />
          {errors.email && <p className="text-danger m-0">{errors.email.message}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input 
            type="password"
            id="password"
            placeholder="Ingrese su contraseña"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            {...register("password", { required: "La contraseña es requerida" })}
          />
          {errors.password && <p className="text-danger m-0">{errors.password.message}</p>}
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
        </div>
      </form>
    </div>
  );
}
