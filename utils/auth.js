import jwt from "jsonwebtoken";

const signToken = (user) => {
  const { _id, name, email, isAdmin } = user;
  return jwt.sign({ _id, name, email, isAdmin }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    // get token from headers
    const tokem = authorization.split(` `)[1];
    jwt.verify(tokem, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).send({ message: "Token is not Valid" });
      } else {
        console.log(
          "🚀 ~ file: auth.js ~ line 15 ~ jwt.verify ~ decodedToken",
          decodedToken
        );
        req.user = decodedToken;
        next()
      }
    });
  } else {
    res.status(401).send({ message: "Token is not Supplied" });
  }
};
export { signToken, isAuth };
