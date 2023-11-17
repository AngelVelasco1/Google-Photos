import { Router } from "express";

const homeRouter = Router();

homeRouter.get("/home", (req, res) => {
  res.render("home/index")
})

homeRouter.post("/upload", (req, res) => {

})

export default homeRouter;