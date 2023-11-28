import Mongoose from "mongoose";

export interface PhotoReq {
  photosId: string,
  albumId: string
}

export interface PhotoFav {
  photoId: string,
  origin: string

}

export interface IPhoto {
  _id?: string;
  fileName: string;
  userID: string;
  size: number;
  mimeType: string;
  createdAt?: Date;
  favorite: boolean;
  albums: string[]
}

const PhotoSchema = new Mongoose.Schema({
  id: { type: Object },
  fileName: { type: String, require: true, unique: true },
  userID: { type: String, require: true },
  size: { type: Number, require: true },
  mimeType: { type: String, require: true },
  createdAt: { type: Date, require: true, default: Date.now() },
  favorite: { type: Boolean, require: true, default: false },
  albums: { type: Array, require: false, default: [] }
});

export default Mongoose.model("Photo", PhotoSchema)