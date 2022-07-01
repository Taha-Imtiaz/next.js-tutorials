// return list of products from db
// pages/api/hello.js
import nc from "next-connect";
import User from "../../../models/User";
import db from "../../../utils/db";
import bcrypt from "bcryptjs";
import { signToken } from "../../../utils/auth";

const handler = nc();

handler.post(async (req, res) => {
  let { name, email, password } = req.body;
  // send products
  // connect to db
  await db.connect();
  const newUser = new User({
    name,
    email,
    password: bcrypt.hashSync(password),
    isAdmin: false,
  });
  const user = await newUser.save();
  await db.disconnect(); // disconnect from db
  const token = signToken(user);
  res.send({
    token,
    _id: user._id,
    name:user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });

  // res.send(user)
});
export default handler;
