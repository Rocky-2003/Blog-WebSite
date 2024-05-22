const { Schema, model } = require("mongoose");
const { randomBytes, createHmac } = require("crypto");


const { createToken } = require("../services/service.js");

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profileImage: {
    type: String,
    default:
      "/public/images/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png",
  },
  salt: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;

  const salt = randomBytes(18).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");
  
  
  user.salt = salt;
  user.password = hashedPassword;
  next();
});

userSchema.static(
  "matchPasswordAndCreateToken",
  async function (email, password) {
    const user = await User.findOne({ email });

    if (!user) throw new Error("Invalid Credentials");

    const salt = user.salt;
    const hashedPassword = user.password;
 

    
    const providedPasswrod = createHmac("sha256", salt)
      .update(password)
      .digest("hex");


    if (hashedPassword !== providedPasswrod) throw new Error("Wrong Password");

    const token = createToken(user);
    return token;
  }
);

const User = new model("user", userSchema);

module.exports = User;
