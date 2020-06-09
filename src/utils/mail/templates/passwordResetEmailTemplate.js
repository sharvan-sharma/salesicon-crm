const beautifyName = require('../index').beautifyName

function passwordResetEmailTemplate(receiverEmail,reciverName,token){

const template = {
    from: '"Sales Team" <salesicon.sales.service@gmail.com>', // sender address
    to: receiverEmail, // list of receivers
    subject: "Password Reset Link from SalesIcon Sales Team", // Subject line
    html: `<h3>Hello ${beautifyName(reciverName)}</h3>
    <p>The Password Reset link is given below<p>
    <a href=${process.env.FRONT_DOMAIN+'/resetpassword?token='+token}>${process.env.FRONT_DOMAIN+'/resetpassword?token='+token}<a>
    <br/><small>This link is going to expire after 10 minute of Generation</small>
    <p>Regards</p>
    <p><b>S</b>ales<b>I</b>con Sales Team</p>` // html body
}
return template
}

module.exports = passwordResetEmailTemplate