import { useForm} from "react-hook-form"
import { useAuth } from "../context/UsuarioProvider"
import { useNavigate }  from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"

export const Register = () => {

  const {register, handleSubmit, formState: {errors} } = useForm()
  const {cuentaAutenticada, registerData, errores} = useAuth()

  const navigate = useNavigate()

  const registerSubmit = async(user) => registerData(user, "register")

  useEffect(() => {
    if(cuentaAutenticada) navigate("/contactosForm")
  }, [cuentaAutenticada])


return (
    <div className="container add-contact">
      <form className="row g-3" onSubmit={handleSubmit(registerSubmit)}>
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
          <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
          <input 
            type="password"
            id="confirmPassword"
            placeholder="Confirme su contraseña"
            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
            {...register("confirmPassword", { 
              required: "Debe confirmar su contraseña",
              validate: value => value === getValues("password") || "Las contraseñas no coinciden"
            })}
          />
          {errors.confirmPassword && <p className="text-danger m-0">{errors.confirmPassword.message}</p>}
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-primary">Registrarse</button>
        </div>
      </form>
    </div>
  );
}
