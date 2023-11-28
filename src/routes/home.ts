import { Router } from "express";
import multer from "multer";
import Photo from "../models/photo";
import Album from "../models/album";
import { auth } from "../middlewares/auth";


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".");
    const suffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const uniqueName = `${suffix}.${ext[ext.length - 1]}`
    cb(null, uniqueName)
  },
});
const upload = multer({ storage });

const homeRouter = Router();

homeRouter.get("/home", auth, async (req, res) => {
  try {
    const photos = await Photo.find({ userID: req.session.user._id })
    const albums = await Album.find({ userID: req.session.user._id})
    res.render("home/index", { user: req.session.user, photos, albums });

  } catch (err) {
        res.render("home/index", { user: req.session.user });

    console.error(err);
    
  }
});

homeRouter.post("/upload", upload.single("file-upload"), (req, res) => {
  const file: any = req.file;
  const props = {
    fileName: file.filename,
    userID: req.session.user._id,
    size: file.size,
    mimeType: file.mimetype,
    createdAt: new Date(),
    favorite: false,
    albums: []
  }
  const newPhoto = new Photo(props)
  newPhoto.save()
  res.redirect("/views/home")
});

export default homeRouter;
