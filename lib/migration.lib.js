var { users, municipals} = require('../config/migrations');


var userModel = require('../models/user.model');
var municipalModel = require('../models/municipal.model');


module.exports =  {

    
    migrateUsers: async () => {

        await users.forEach(async user => {
            let userDocumentCount = await userModel.countDocuments({
                username: user.username
            })
            
                if(userDocumentCount === 0) {
                        await userModel.create({
                            ...user,
                            isAdmin : true,
                        })
            
                        
                }
        })
    }
    ,
    migrateMunicipals : async () =>{
        //console.log(municipals.length); 

        await municipals.forEach(async municipal => {
            let municipalDocumentCount = await municipalModel.countDocuments({
                name: municipal.name
            })
            
            if(municipalDocumentCount === 0) {
                await municipalModel.create({
                    ...municipal,
                })
    
            }
        })

        
    }
}