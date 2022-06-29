
import express from "express";
import cors from "cors"
import bodyparser from "body-parser";
import userRoute from "../server/src/routers/user_r.js"

const app=express();



app.use(cors())
app.use(bodyparser.json({ limit: '100mb', extended: true }))
app.use(bodyparser.urlencoded({ limit: '10mb', extended: true }))
app.use(userRoute)

app.get('/',(err,res)=>{
    res.send("wellcome")
})

app.listen(5000,()=>{console.log('server runnning at port 5000')})