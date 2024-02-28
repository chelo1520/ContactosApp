import { config } from "dotenv";
config()
import app from "./app.js";
import { conectDB } from "./db.js";


await conectDB()
const PORT = process.env.PORT
app.listen(PORT)
console.log(`App iniciada en port ` + PORT);

