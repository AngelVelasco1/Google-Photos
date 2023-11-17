import { Router } from "express";

const homeRouter = Router();

homeRouter.get("/home", (req, res) => {
  res.render("home/index", {user: req.session.user})
})

homeRouter.post("/upload", (req, res) => {

})

export default homeRouter;