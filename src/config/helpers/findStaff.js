const models = require('../models')
const Staff = models.Staff
const StaffRole = models.StaffRole
const RoleRights = models.RoleRights

module.exports  = async (staff_id)=>{
    try{
        let staffobj = await Staff.findOne({_id:staff_id})
        let roleobj = await StaffRole.findOne({staff_id}).populate('role_id')
        if(roleobj){
            let rightArray = await RoleRights.findOne({role_id:roleobj.role_id.name}).populate('right_id',"screens")
            if(rightArray){
                let screens = []
                rightArray.right_id.forEach(obj=>{
                    screens = [...screens,...obj.screens]
                })
                
                let userobj = {
                    ...staffobj._doc,
                    role_name:(roleobj)?roleobj.role_id.name:'',
                    screens
                }

                return userobj
            }else{
                let userobj = {
                        ...staffobj._doc,
                        role_name:roleobj.role_id.name || '',
                        screens:[]
                    }

                return userobj
            }
        }else{
            let userobj = {
                        ...staffobj._doc,
                        role_name:'',
                        screens:[]
                    }

            return userobj
        }
    }catch(e){
        console.log(e)
        return e
    }

}

