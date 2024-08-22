import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({
      message: "Not Authenticated",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, payload) => {
    if (error) {
      return res.status(403).json({
        message: "Inavalid Token",
      });
    }

    req.userId = payload.id;

    next();
  });
};
