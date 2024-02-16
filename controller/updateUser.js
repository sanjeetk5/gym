const User = require("../model/userInfo");
const ADMIN = require("../model/Admin");
const sendMail = require("../commons/sendMail");

exports.updateUser = async (req, res) => {
  try {
    const { name, email, phone, _id, plan } = req.body;
    console.log("this is req body ", req.body);

    let updateUser = await User.findOneAndUpdate(
      { _id: _id },
      { $set: { name, email, phone, plan } },
      { new: true }
    );

    if (!updateUser) {

      updateUser = await ADMIN.findOneAndUpdate(
        { _id: _id },
        { $set: { name, email, phone, plan } },
        { new: true }
      );
        if(!updateUser){
      return res.status(404).json({
        success: false,
        message: "user is note found in existing database",
      });}
    }
    
    // this function will send user information when there is an update
    sendMail(updateUser);
    return res.status(200).json({
      success: true,
      message: updateUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


