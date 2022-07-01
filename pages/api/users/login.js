// return list of products from db
// pages/api/hello.js
import nc from "next-connect";
import User from "../../../models/User";
import db from "../../../utils/db";
import bcrypt from "bcryptjs";
import { signToken } from "../../../utils/auth";

const handler = nc();

handler.post(async (req, res) => {
  let { email, password } = req.body;
  // send products
  // connect to db
  await db.connect();
  const user = await User.findOne({ email });
  await db.disconnect(); // disconnect from db
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = signToken(user);
    const { _id, name, email, isAdmin } = user;
    res.send({
      token,
      _id,
      name,
      email,
      isAdmin,
    });
  } else {
    res.status(401).send({ message: "Invalid Email or Password" });
  }
  // res.send(user)
});
export default handler;
