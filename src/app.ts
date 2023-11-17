import express from "express";
import session from "express-session";
import cors from "cors";
import { join } from "path";
import mongoose from "mongoose";
import { CONFIG } from "./config/credentials";
import authRouter from "./routes/login";
import { IUser } from "./models/user";
import homeRouter from "./routes/home";


declare module "express-session" {
  interface Session {
    user: IUser
  }
}

export const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
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


app.use("/views", authRouter);
app.use("/views", homeRouter); 




const options: mongoose.ConnectOptions = {
  dbName: CONFIG.db_name as string,
  user: CONFIG.db_username as string,
  pass: CONFIG.db_password as string,
};

(async () => {
  await mongoose.connect(CONFIG.db_connection as string, options);
  console.info("Connected to MongoDB");
})();

app.listen(CONFIG, () => {
  console.log(`Server is running ON http://${CONFIG.hostname}:${CONFIG.port}`);
});
