// return list of products from db
// pages/api/hello.js
import nc from "next-connect";
import Product from "../../models/Product";
import User from "../../models/User";
import data from "../../utils/data";
import db from "../../utils/db";

const handler = nc();

handler.get(async (req, res) => {
  // send products
  // connect to db
  await db.connect();
  await User.deleteMany(); //delete all previous products
  await User.insertMany(data.users);
  await Product.deleteMany(); //delete all previous products
  await Product.insertMany(data.products);
  await db.disconnect(); // disconnect from db
  res.send({ message: "Seeded Data Successfully!" });
});
export default handler;
