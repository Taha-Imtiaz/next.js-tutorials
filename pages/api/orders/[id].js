// return list of products from db
// pages/api/hello.js
import nc from "next-connect";
import Order from "../../../models/Order";
import { isAuth } from "../../../utils/auth";
import db from "../../../utils/db";

const handler = nc()
handler.use(isAuth)
 handler.get(async(req, res) =>{
    // send product
    // connect to db
    await db.connect()
    const order = await Order.findById(req.query.id)
    await db.disconnect() // disconnect from db
    res.send(order)
})
export default handler