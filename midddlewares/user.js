module.exports = function (req,res,next) {
    const { user } = req;
    if(user.data.isAdmin)return res.status(403).send("Access Denied")
    next()
}