const beautifyName = require('../index').beautifyName

function passwordResetEmailTemplate(receiverEmail,reciverName,token){

const template = {
    from: '"Sales Team" <noteskeeper247@gmail.com>', // sender address
    to: receiverEmail, // list of receivers
    subject: "Password Reset Link from sales Lead", // Subject line
    html: `<h3>Hello ${beautifyName(reciverName)}</h3>
    <p>The Password Reset link is given below<p>
    <a href=${process.env.FRONT_DOMAIN+'/resetpassword?token='+token}>${process.env.FRONT_DOMAIN+'/resetpassword?token='+token}<a>
    <br/><small>This link is going to expire after 10 minute of Generation</small>
    <p>Regards</p>
    <p>Sales Team</p>` // html body
}
return template
}

module.exports = passwordResetEmailTemplate