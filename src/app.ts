import express from "express";
import session from "express-session";
import cors from "cors";
import { join } from "path";
import mongoose from "mongoose";
import { CONFIG } from "./config/credentials";
import { log } from "console";

export const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(join(__dirname, "../public")));

app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: CONFIG.session_secret as string,
    resave: false,
    saveUninitialized: false,
  })
);

const options: mongoose.ConnectOptions = {
  dbName: CONFIG.db_name as string,
  user: CONFIG.db_username as string,
  pass: CONFIG.db_password as string,
};

(async () => {
  await mongoose.connect(CONFIG.db_connection as string, options);
  console.info("Connected to MongoDB");
})();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(CONFIG, () => {
  console.log(`Server is running ON http://${CONFIG.hostname}:${CONFIG.port}`);
});
