function CapitalizeFirstLetter(str){
    return str.substring(0,1).toUpperCase()+str.substring(1).toLowerCase()
}

function beautifyName(name){
    const middlename = CapitalizeFirstLetter(name.middlename)+' ' || ''  
    return CapitalizeFirstLetter(name.firstname)+' '+middlename+CapitalizeFirstLetter(name.lastname)       
}

module.exports = beautifyName