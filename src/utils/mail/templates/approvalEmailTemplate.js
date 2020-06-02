const beautifyName = require('../index').beautifyName

function approvalEmailTemplate(receiverEmail,reciverName,token){

const template = {
    from: '"Sales Team" <salesicon.sales.service@gmail.com>', // sender address
    to: receiverEmail, // list of receivers
    subject: "Approval Email from your Admin", // Subject line
    html: `<h3>Hello ${beautifyName(reciverName)}</h3>
    <p>The Approval link is given below<p>
    <a href=${process.env.FRONT_DOMAIN+'/approval?token='+token}>${process.env.FRONT_DOMAIN+'/approval?token='+token}<a>
    <p>Regards</p>
    <p><b>S</b>ales<b>I</>con Sales Team</p>` // html body
}
return template
}

module.exports = approvalEmailTemplate