
exports.checkHasPermission = (permissions) => (req,res,next) =>{
    const { user } = req;
    const errors = [];

    try {
        if(user){
            if(typeof permissions === 'string'){
                permissions = [permissions]
            }
            console.log(req.user.data)
            permissions.forEach(permission => {
                if(!(user.data.permissions.includes(permission))){
                    errors.push(`You dont have ${permission} permission`)
                }
            });
            if(errors.length === 0 ) {
                return  next();
            }
            throw new Error('You dont have the correct privilege ')

        }
    }
    catch(err){
        res.status(401).json({
            error: true,
            message: errors
        })
    }
}