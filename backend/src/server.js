import express from "express"
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"
import cors from  "cors"
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config();

const app = express();
const PORT  = process.env.PORT

app.use(cors());
app.use(express.json()) // middleware
app.use(rateLimiter)

app.use("/api/notes", notesRoutes );

connectDB().then(() => {
    app.listen(PORT, () => {
      console.log("Server started on PORT:", PORT);
    });
  });


