import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDB } from "./db/index.js";

dotenv.config();
const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`app listening the Port:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(`MongoDB connection error `, err);
    process.exit(1);
  });
