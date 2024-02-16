const transporter = require("../Config/transport");
const { error } = require("console");

const sendMail = async (userInfo) => {
  const{from,to,subject,html} = userInfo;
  console.log("data we will sned ",from,to,subject,html);
    try {
      const isMailsent = await transporter.sendMail({
        from: from,
        to: to,
        subject: subject,
        html:html,
      });
  
      if (!isMailsent) {
        throw new error("something occured while sending mail");
      }
  
      console.log("this is mail info ", isMailsent);
    } catch (err) {
     console.log(`some error in db ${err.message}`)
    }
  };

  module.exports = sendMail;

