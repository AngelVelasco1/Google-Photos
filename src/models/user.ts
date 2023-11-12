import Mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Mongoose.Schema({
  id: { type: Object },
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  name: { type: String, require: true },
})


UserSchema.pre("save", async (next): Promise<void> => {
    if (this.isModified("password") || this.isNew) {    
        const document = this;
        bcrypt.hash(document.password, 5, (err, hash) => {
          if (err) return next(err);
          document.password = hash;
          next();
        })   
    }
    next();
})

UserSchema.methods.duplicateUsername = async (username: string): Promise<boolean> => {
  const findUsername = await this.model("User").findOne({ username: username });
  const result = findUsername.length > 0;
  return result
}

UserSchema.methods.validatePassword = async (password: string, hash: any): Promise<boolean> => {
  const compared = await bcrypt.compare(password, hash)
  return compared;
}

export default Mongoose.model("User", UserSchema)