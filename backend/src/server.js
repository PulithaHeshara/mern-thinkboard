import express from "express"
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"
import cors from  "cors"
import rateLimiter from "./middleware/rateLimiter.js";
import path from "path"


dotenv.config();

const app = express();
const PORT  = process.env.PORT
const _dirname = path.resolve(); 

if(process.env.NODE_ENV !== "production"){
  
    app.use(cors());
}


app.use(express.json()) // middleware
app.use(rateLimiter)

app.use("/api/notes", notesRoutes );

if(process.env.NODE_ENV == "production"){

    app.use(express.static(path.join(_dirname,"../frontend/dist")))

    app.get("*", (req, res)=>{
    res.sendFile(path.join(_dirname, "../frontend", "dist","index.html  "))
    })

}


connectDB().then(() => {
    app.listen(PORT, () => {
      console.log("Server started on PORT:", PORT);
    });
  });


