module.exports = (name)=>{
        const {firstname,middlename,lastname} = name
        if(!firstname || firstname.length < 3 || firstname.includes(' ')){
            return false
        }else if(firstname.length  > 20 || (middlename && middlename.length > 20)  || (lastname && lastname.length > 20)){
            return false
        }else{
            return true
        }   
}