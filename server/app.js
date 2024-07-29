 import express from "express";
 import cors from "cors"
 import cookieParser from "cookie-parser"
import AuthRoute from "./routes/auth.route.js"

 const app =  express();



 app.use(express.json());
 app.use(cookieParser());
 app.use(cors({origin:process.env.CLIENT_URL , credentials :  true}))

 app.listen(8800 , () => {
    console.log(`server is running `);
 })



//  app.use("/api/posts" , PostRoute)

app.use("/api/auth" , AuthRoute)



 //testing
 app.use("/api/test" ,  (req , res) => {
    res.send(`It Works`)
 }) 