var { permissions, roles, users, municipals} = require('../config/migrations');

const permissionModel = require('../models/permission.model')
const roleModel = require('../models/role.model')
var userModel = require('../models/user.model');
var municipalModel = require('../models/municipal.model');


module.exports =  {
    migratePermissions: async () => {
        
        // retrieve all permissions from db
        let permissionDocument =  await permissionModel.find({})
        
        if(permissions.length > permissionDocument.length) {
                
                // some operation
                permissions = permissions.filter(per => {
                    return permissionDocument.findIndex(val => val.name === per) === -1
                })
                await permissionModel.insertMany([
                    ...permissions.map(val => ({name: val}))
                ])
            
                return;
            }
    },

    migrateRoles: async () => {
        

        await Object.keys(roles).forEach( async index => {
            // count if role exists
            let roleDocumentCount = await roleModel.countDocuments({ name: index})
            if(roleDocumentCount === 0) {
                
                 let data =  await permissionModel.find({
                      name: {
                          $in: roles[index]
                      }
                  })
                  
                  await roleModel.create({
                        name: index,
                        permissions: data.map(val => val._id)
                    })
                    
                   
            }
            })
            
        
    },

    migrateUsers : async () =>{
        await users.forEach(async user => {
            let userDocumentCount = await userModel.countDocuments({
                email: user.email
            })
            
                if(userDocumentCount === 0) {
                    let data = await roleModel.find({
                        name: {
                            $in: user.roles // [1,2,3]
                        }
                    })
                        await userModel.create({
                            ...user,
                            roles: data.map(val => val._id)
                        })
                        
                        
                }
        })
        
    },
    migrateMunicipals : async () =>{
        //console.log(municipals.length); 
        await municipals.forEach(async municipal => {
            let municipalDocumentCount = await municipalModel.countDocuments({
                username : municipal.username
            })
            if(municipalDocumentCount === 0){
                let data = await roleModel.find({
                    name: {
                        $in: municipal.roles // [1,2,3]
                    }
                })
                await municipalModel.create({
                    ...municipal,
                    roles: data.map(val => val._id)
                })
            }
        })
    }
}