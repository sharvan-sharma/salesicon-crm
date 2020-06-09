
function staffRegistrationEmailTemplate(receiverEmail,token){

const template = {
    from: '"Sales Team" <salesicon.sales.service@gmail.com>', // sender address
    to: receiverEmail, // list of receivers
    subject: "Register Email from your Admin", // Subject line
    html: `<h3>Hello</h3>
    <p>The Regsitration link is given below<p>
    <a href=${process.env.FRONT_DOMAIN+'/signup/staff?token='+token}>${process.env.FRONT_DOMAIN+'/signup/staff?token='+token}<a>
    <p>Regards</p>
    <p><b>S</b>ales<b>I</b>con Sales Team</p>` // html body
}
return template
}

module.exports = staffRegistrationEmailTemplate