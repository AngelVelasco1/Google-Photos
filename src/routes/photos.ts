import { Router } from "express";
import Album from "../models/album";
import Photo, { PhotoReq, PhotoFav } from "../models/photo";
import { auth } from "../middlewares/auth";


const photoRouter = Router();

photoRouter.post("/addToAlbum", auth, async (req, res) => {
  const { photosId, albumId }: PhotoReq = req.body;

  const Ids = photosId.split(",");
  const newPhotosAlbum: Array<object> = [];

  Ids.forEach((id) => {
    newPhotosAlbum.push(
      Photo.findByIdAndUpdate(id, { $push: { albums: albumId } })
    );
  });
  await Promise.all(newPhotosAlbum);

  res.redirect("/views/home");
});

photoRouter.post("/addFavorite", auth, async (req, res) => {
  const { photoId, origin }: PhotoFav = req.body;
  try {
    await Photo.findByIdAndUpdate(photoId, {
      $set: { favorite: true },
    });
    res.redirect(origin);
  } catch (err) {
    console.error(err);
  }
});
photoRouter.post("/removeFavorite", auth, async (req, res) => {
  const { photoId, origin }: PhotoFav = req.body;
  try {
    await Photo.findByIdAndUpdate(photoId, {
      $set: { favorite: false },
    });

    res.redirect(origin)
  } catch (err) {
    console.error(err);
  }
});
photoRouter.get("/preview/:id", auth, async (req, res) => {
  const id = req.params.id
  const  origin  = req.query.origin;
  try {
    const photo = await Photo.findById(id);
    const albums = await Album.find({ userID: req.session.user._id! });

    res.render('layout/preview', {user: req.session.user, photo, albums, origin})
  } catch (err) {
    console.error(err);
    
  }
});

export default photoRouter;
