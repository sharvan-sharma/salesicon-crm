const nodemailer = require("nodemailer");

const senEmail = async (template)=>{
  let transporter = nodemailer.createTransport({
    service:'Gmail',// true for 465, false for other ports
    auth: {
      user: process.env.SERVICE_EMAIL, // generated ethereal user
      pass: process.env.SERVICE_EMAIL_PASSWORD // generated ethereal password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail(template);

  // console.log("Message sent: %s", info.messageId,'exec')
}


module.exports = senEmail