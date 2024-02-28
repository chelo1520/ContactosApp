import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import './index.css'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { UsuarioProvider } from './context/UsuarioProvider'
import { Contactos } from './pages/Contactos'
import { ContactosForm } from './pages/ContactosForm'
import { ProtectRoutes } from './ProtectRoutes'
import { HomePage } from './pages/HomePage'
import { Navbar } from './components/Navbar.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <UsuarioProvider>
      <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path='/' element={<HomePage/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route element={<ProtectRoutes/>}>
                <Route path='/contactos' element={<Contactos/>}></Route>
                <Route path='/contactosForm' element={<ContactosForm/>}></Route>
                <Route path='/contactosForm/:id' element={<ContactosForm/>}></Route>
                <Route path='/profile' element={<h1>Perfil</h1>}></Route>
            </Route>
          </Routes>
      </BrowserRouter>
  </UsuarioProvider>
)
