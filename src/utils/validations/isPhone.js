function isPhone(phone){
  var regex = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;
    if (phone.match(regex)) {
        return true
    } else {
        return false
    }
}

module.exports = isPhone