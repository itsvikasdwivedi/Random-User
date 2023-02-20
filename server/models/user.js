import {model,Schema} from "mongoose"

const userSchema = new Schema({
    picture: {type:String, required:true,},
    first: {type:String, required:true,},
    last: {type:String, required:true,},
    gender: {type:String, required:true,},
    email: {type:String, required:true,},
    location: {type:String, required:true,},
    pin:{type:String, required:true,},
    nat: {type:String, required:true,}
})

const USER = model("user", userSchema)

export default USER