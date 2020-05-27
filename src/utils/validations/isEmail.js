
function isEmail(email){
if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
    return true
}else{
    return false
}
}


module.exports = isEmail