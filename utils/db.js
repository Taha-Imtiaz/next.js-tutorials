import mongoose from "mongoose";

const connection = {};

const connect = async () => {
  // already connected to db
  if (connection.isConnected) {
    console.log("already connected");
    return;
  }
  if (mongoose.connections.length > 0) {
    //  mongoose.connections contains all previous connections to the database
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      /*connection is ready */
      console.log("use previous connection");
      return;
    }
    //   if connection is not ready
    await mongoose.disconnect();
  }

  const db = await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  });
  console.log("new connection");
  connection.isConnected = db.connections[0].readyState;
};

const disconnect = async () => {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log("not disconnected");
    }
  }
};
const convertDocToObj = (doc) => {
  doc._id = doc._id.toString();
  doc.createdAt = doc.createdAt.toString();
  doc.updatedAt = doc.updatedAt.toString();
  return doc;
};

const db = { connect, disconnect, convertDocToObj };
export default db;
