import Mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
  _id?: string;
  name?: string;
  username: string;
  password: string;
  usernameExist: (username: string) => Promise<boolean>;
  validatePassword: (password: string, hash: string) => Promise<boolean>;

}

const UserSchema = new Mongoose.Schema({
  id: { type: Object },
  name: { type: String },
  username: { type: String, unique: true, require: true },
  password: { type: String, unique: true, require: true },
});

UserSchema.pre("save",  function (next) {
  if (this.isModified("password") || this.isNew) {
    const document: any = this;

    bcrypt.hash(document.password, 10, (err, hash) => {
      if (err) {
        return next(err);
      } 
      document.password = hash;
      next();
    });
  } else {
    next();
  }
});

UserSchema.methods.usernameExist = async function(
  this: IUser,
  username: string
): Promise<boolean> {
  const findUsername = await Mongoose.model<IUser>("User").find({
    username: username
  });
  return findUsername.length > 0;
};

UserSchema.methods.validatePassword = async function(
  password: string,
  hash: any
): Promise<boolean>  {
  const compared = await bcrypt.compare(password, hash);

  return compared;
};

export default Mongoose.model<IUser>("User", UserSchema);
