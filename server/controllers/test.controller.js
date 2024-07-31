import jwt from "jsonwebtoken";

export const shouldBeLoggedIn = async (req, res) => {

    console.log("shouldBeLoggedIn route called");

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Not Authenticated!",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, payload) => {
    if (error) {
      return res.status(403).json({
        message: "Token is not valid!",
      });
    }

    return res.status(200).json({
      message: "You are Authenticated!",
    });
  });
};

export const shouldBeAdmin = async (req, res) => {
  // Admin logic goes here
  res.status(200).json({
    message: "Admin check logic should be here.",
  });
};
