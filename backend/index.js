/**
 * Main server entry file
 * Uses ES Module syntax because project is configured as "type": "module"
 */

import express from "express";
import cors from "cors";
import rootrouter from "./routes/account.js";  
import blogrouter from "./routes/blog.js";  


const app = express();


app.use(cors());

app.use(express.json());

app.use("/api/v1/user", rootrouter);

app.use('/api/v1/blog', blogrouter);  


app.listen(3000, () => {
  console.log("server is up and running");
});
