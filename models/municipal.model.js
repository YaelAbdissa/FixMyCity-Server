
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const bcrypt = require('bcrypt')

const municipalSchema = new mongoose.Schema({
    username: { type: String, default: '' },
    name: { type: String, default: '' },
    password: { type: String, required: true, minlength: 8, maxlength: 128},
    firebase_reg_token: { type: String, default: '' },
    isMunicipal : { type : Boolean, default:true},
})


municipalSchema.pre('save', function preSave(next) {
    let model = this

    model.hashPasswd(model.password, (err, hash) => {
        model.password = hash
        next()
    })
})


municipalSchema.method({
    verifyPassword(passwd) {
        return new Promise((resolve, reject) => {
          bcrypt.compare(passwd, this.password, (err, isMatch) => {
            if (err) {
              return reject(err)
            }
      
            resolve(isMatch)
          })
        })
      },
      hashPasswd(passwd, cb) {
        let createHash = (err, hash) => {
          if (err) {
            return cb(err)
          }
      
          cb(null, hash)
        }
      
        let generateSalt = (err, salt) => {
          if (err) {
            return cb(err)
          }
      
          // Hash the password using the generated salt
          bcrypt.hash(passwd, salt, createHash)
        }
      
        // Generate a salt factor
        bcrypt.genSalt(12, generateSalt) 
      }
})
 

municipalSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Municipal', municipalSchema);
