 import express from "express";
import AuthRoute from "./routes/auth.route.js"

 const app =  express();



 app.use(express.json())

 app.listen(8800 , () => {
    console.log(`server is running `);
 })



//  app.use("/api/posts" , PostRoute)

app.use("/api/auth" , AuthRoute)



 //testing
 app.use("/api/test" ,  (req , res) => {
    res.send(`It Works`)
 }) 