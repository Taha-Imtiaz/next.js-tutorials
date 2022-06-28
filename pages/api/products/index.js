// return list of products from db
// pages/api/hello.js
import nc from "next-connect";
import Product from "../../../models/Product";
import db from "../../../utils/db";

const handler = nc()

 handler.get(async(req, res) =>{
    // send products
    // connect to db
    await db.connect()
    const products = await Product.find({})
    await db.disconnect() // disconnect from db
    res.send(products)
})
export default handler