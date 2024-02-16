const express = require("mongoose");

const userInfo = new express.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    // phone:{
    //     type:Number,
    //     required:true,
    //     trim:true
    // },
    email:{
        type:String,
        required:true,
        trim:true
    },
    // dateOfBirth:{
    //     type:Date,
    //     required:true,
    // }
    // ,
    photo:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    registrationDate:{
        type:Date,
        require:true,
        default:Date.now()
    },
    plan:{
        type:String,
        default:"basic",
        enum:["basic","standard","premium","executive"],
    }
});

// userInfo.post("updateOne",(doc)=>{
//     try{
//         console.log("doc we received ",doc);
//         return;
//     } catch(err){
//         return err.message
//     }
// })


module.exports = express.model("user",userInfo);
