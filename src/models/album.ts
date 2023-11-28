import Mongoose from "mongoose";


export interface IAlbum {
  id?: string;
  name: string;
  userID?: string;
  isprivate: boolean;
  createdAt: Date;
}

const AlbumSchema = new Mongoose.Schema({
  id: { type: Object },
  name: { type: String, require: true, unique: true },
  userID: { type: String, require: true },
  isprivate: { type: Boolean, require: true, default: true },
  createdAt: { type: Date, require: true, default: Date.now() }
})

export default Mongoose.model("Album", AlbumSchema)