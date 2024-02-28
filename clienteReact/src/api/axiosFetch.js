import axios from "axios";

// Crea una instancia de Axios con la configuración necesaria
const axiosInstance = axios.create({
  withCredentials: true, // Habilita el envío de cookies entre dominios
});

const registerURL = "http://localhost:4000/register";
const loginURL = "http://localhost:4000/login";

//Usuario registrar y loguear
export const dataFetch = (user, type) => {
  let url;

  switch (type) {
    case "register":
      url = registerURL;
      break;
    case "login":
      url = loginURL;
      break;
    default:
      throw new Error("Tipo de operación no válido");
  }

  try {

    return axiosInstance.post(url, user);
    
  } catch (error) {
    console.log(error);
    throw error; 
  }
};

//Agregar contactos
export const contactoCreate = (contacto) => {
  // eslint-disable-next-line no-useless-catch
  try {
    return axiosInstance.post("http://localhost:4000/contactos", contacto)
  } catch (error) {
    throw error; 
  } 
 
}

//Contactos del usuario
export const contactoGet = () => {
  return axiosInstance.get("http://localhost:4000/contactos")
} 

//Logout
export const logout = () => {
  return axiosInstance.post("http://localhost:4000/logout")
}

//Eliminar contacto
export const deleteContacto = (id) => {
  try {
   return axiosInstance.delete(`http://localhost:4000/contactos/${id}`)
  } catch (error) {
    console.log(error);
  }
}
//Actualizar contacto
export const updateContacto = (id, contacto) => {
  try {
   return axiosInstance.put(`http://localhost:4000/contactos/${id}`, contacto)
  } catch (error) {
    console.log(error);
  }
}

//Obtener contacto

export const obtenerContacto = (id) => {
  try {
   return axiosInstance.get(`http://localhost:4000/contactos/${id}`)
  } catch (error) {
    console.log(error);
  }
}