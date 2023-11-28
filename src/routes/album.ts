import { Router } from "express";
import Album from "../models/album";
import { IAlbum } from "../models/album";
import Photo from "../models/photo";
import { auth } from "../middlewares/auth";

const albumRouter = Router();

albumRouter.get("/albums", auth, async (req, res) => {
  try {
    const albums = await Album.find({ userID: req.session.user._id });
    let photos = await Photo.find({ userID: albums });

    res.render("albums/index", { user: req.session.user, photos, albums });
  } catch (err) {
    console.error(err);
  }
});

albumRouter.get("/albums/:id", auth, async (req, res) => {
  const albumId = req.params.id;
  try {
    let photos = await Photo.find({ albums: albumId });

    const album: any = await Album.findById(albumId);
    const albums = await Album.find({ userID: req.session.user._id! });

    if (req.session.user._id !== album.userID && album.isprivate) {
      res.render("errors/errors", {});
      return;
    }

    res.render("albums/visualize", {
      user: req.session.user,
      photos,
      album,
      albums,
    });
  } catch (err) {
    console.error(err);
  }
});

albumRouter.post("/createAlbum", auth, async (req, res) => {
  try {
    const { name, isprivate }: { name: string; isprivate: string } = req.body;

    const props: IAlbum = {
      name: name,
      userID: req.session.user._id,
      createdAt: new Date(),
      isprivate: isprivate === "on",
    };
    const newAlbum = new Album(props);
    await newAlbum.save();
    res.redirect("/views/albums");
  } catch (err) {
    console.error(err);
  }
});
export default albumRouter;
