// return list of products from db
// pages/api/hello.js
import nc from "next-connect";
import Order from "../../../models/Order";
import { isAuth } from "../../../utils/auth";
import db from "../../../utils/db";
import { onError } from "../../../utils/error";

const handler = nc({
  onError,
});
handler.use(isAuth); //middleware for authentication contains userInfo that created the order

handler.post(async (req, res) => {
  // send products
  // connect to db
  await db.connect();
  const newOrder = new Order({
    ...req.body,
    user: req.user._id
  });
  //   save the order
  const order = await newOrder.save();
  await db.disconnect(); // disconnect from db
  res.status(201).send(order);
});
export default handler;
