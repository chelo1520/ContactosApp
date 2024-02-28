import app from "./app.js";
import { conectDB } from "./db.js";

await conectDB()
app.listen(4000)
console.log(`App iniciada en port `, 4000);

