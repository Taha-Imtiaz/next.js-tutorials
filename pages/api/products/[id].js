// return list of products from db
// pages/api/hello.js
import nc from "next-connect";
import Product from "../../../models/Product";
import db from "../../../utils/db";

const handler = nc()

 handler.get(async(req, res) =>{
    // send product
    // connect to db
    await db.connect()
    const product = await Product.findById(req.query.id)
    await db.disconnect() // disconnect from db
    res.send(product)
})
export default handler