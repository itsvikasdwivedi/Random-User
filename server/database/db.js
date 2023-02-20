import mongoose  from "mongoose"
import dotenv from "dotenv"
dotenv.config();
mongoose.set('strictQuery', true);
export default  mongoose.connect(process.env.MONGOURL)

mongoose.connection.on("connected",()=>{
    console.log("connected to database successfully,");
})

mongoose.connection.on("error",(err)=>{
    console.log("Error while connection to database:" + err );
})

mongoose.connection.on("disconnected",(err)=>{
    console.log("Mongodb connection disconnected");
})