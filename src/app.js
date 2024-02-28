import express, { json } from "express"
import morgan from "morgan";
import routeS from "./routes/auht.routes.js";
import routeC from "./routes/contactos.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors"


const app = express()

//Middlewares
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))

//Rutas
app.use(routeS)
app.use(routeC)





export default app

