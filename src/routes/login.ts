import { Router } from "express";
import User, { IUser } from "../models/user";

const authRouter = Router();

authRouter.get("/login", (req, res) => {
  res.render("login/index", { url: req.protocol + "://" + req.headers.host });
});

authRouter.get("/signup", (req, res) => {
  res.render("login/signup", { url: req.protocol + "://" + req.headers.host });
});

authRouter.post("/auth", async (req, res, next) => {
  const { username, password }: IUser = req.body;
  if (!username || !password) {
    res.redirect("/views/login");
  } else {
    try {
      const userExist = await  User.findOne({ username: username })

      if (userExist) {

        const correctPassword = await userExist.validatePassword(
          password,
          userExist.password
        );

        if (correctPassword) {
          req.session.user = userExist;
          res.redirect("/views/home");
        } else {
          res.redirect("/views/login");
        }
      }
    } catch (err) {
      console.error(err);
      res.redirect("/views/login");
    }
  }
});

authRouter.post("/register", async (req, res, next) => {
  const { name, username, password }: IUser = req.body;

  if (!name || !username || !password) {
    console.log("Don't provide credentials");

    res.redirect("/views/signup");
  } else {
    try {
      const props = {
        name,
        username,
        password,
      };

      const newUser = new User(props);
      const alreadyExist = await newUser.usernameExist(username);
      if (alreadyExist) {
        console.log("The user already exist");
        res.redirect("/views/signup");
      }
      await newUser.save();
      res.redirect("/views/login");
    } catch (err) {
      console.error(err);
      res.redirect("/views/signup");
    }
  }
});

export default authRouter;
