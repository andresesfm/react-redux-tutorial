import mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";
const Schema = mongoose.Schema;
//Define model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

//On save hook, encrypt password
//Before saving the model, run this function
userSchema.pre("save", function(next) {
  const user = this;
  //Generate salt
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    //Hash (encrypt) our password using the salt
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});
//Create model class
const ModelClass = mongoose.model("user", userSchema);

//Export model
export default ModelClass;
