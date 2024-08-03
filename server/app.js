import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import AuthRoute from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";
import UserRoute from "./routes/user.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use("/api/auth", AuthRoute);
app.use("/api/test", testRoute);
app.use("/api/users" , UserRoute)

app.listen(8800, () => {
  console.log("Server is running");
});

// Testing route (remove in production)
app.use("/api/test-check", (req, res) => {
  res.send("It Works");
});
