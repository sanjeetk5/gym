const cloudinary = require("cloudinary").v2;
const ADMIN = require("../model/Admin");
const USER = require("../model/userInfo");


const uploadImageToCloudinary = async(file,folder,size)=>{
    const options = {folder};
    options.resource_type = "auto";
    if(size){
        options.size = size;
    }

    try{
        const result = await cloudinary.uploader.upload(file.tempFilePath,options);
        console.log(result);
        return result;

    } catch(err){
        console.error("stuck in error");
        console.error(err.message);
    }
}

const uploadImage = async(req,res)=>{
    try{
        const image = req.files.file;
        console.log("image we received ",image);
        console.log("req body ",req.body.email);
        const email = req.body.email;
        if(!image){
            return res.json({
                success:false,
                message:"please select image first"
            })
        }

        const response = await uploadImageToCloudinary(image,"shubham");

        if(!response){
            return res.json({
                success:false,
                message:"error while uploading image.. try again"
            })
        }

            let userData = await ADMIN.findOneAndUpdate({"email":email},{$set:{photo:response.secure_url}},{new:true});
         if(!userData){
            userData = await USER.findOneAndUpdate({"email":email},{$set:{photo:response.secure_url}},{new:true});
         }
        console.log("response after uploading ",response);

        return res.json({
            success:true,
            message:"lets check"
        })
    } catch(err){
        return res.json({
            success:false,
            message:err.message
        })
    }
}
module.exports = uploadImage;