import { Router } from "express";
import { register, login, logout, profile , verifyToken} from "../controllers/controllers.js";

const route = Router()


route.post("/register", register)
route.post("/login" , login)
route.post("/verify", verifyToken)
route.post("/logout", verifyToken, logout)
route.post("/profile", verifyToken, profile)

export default route;