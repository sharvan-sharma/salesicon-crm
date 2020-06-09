const beautifyName = require('../index').beautifyName

module.exports = (tempObj)=>{
    const lead_name = beautifyName(tempObj.lead_name)
    const staff_name = beautifyName(tempObj.staff_name)
    const template = {
            from: '"Sales Team" <salesicon.sales.service@gmail.com>', // sender address
            to: tempObj.lead_email, // list of receivers
            subject: "Query Confirmation Email from SalesIcon Sales Team", // Subject line
            html: `<h3>Hello <b>${lead_name}</b></h3>
            <p>Your query is being handled by our sales person<p>
            <p>
                Contact our Sales Person ${staff_name} on this email 
                <a href="${tempObj.staff_email}">
                    ${tempObj.staff_email}
                </a> 
            </p>
            
            <p>Regards</p>
            <p><b>S</b>ales<b>I</b>con Sales Team</p>` // html body
        }
    return template
}