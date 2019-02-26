/*Check Authentification*/
const jwt = require('jsonwebtoken');
module.exports = (req, res, next ) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    req.userData = jwt.verify(token, process.env.JWT_KEY);
  }catch (e) {
    return res.status(401).json({
      message: "Auth failed"
    })
  }

  next();
};