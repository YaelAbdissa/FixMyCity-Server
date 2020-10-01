
const mongoose = require('mongoose');


const reportSchema = new mongoose.Schema({
    name: { type: String, default: '' },
    description: { type: String, default: '' },
    photo_url: { type: String, default: '' },
    isResolved: { type: Boolean, default: false},
    reported_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reported_to: { type: mongoose.Schema.Types.ObjectId, ref: 'Municipal' },
    
})


module.exports = mongoose.model('Reports', reportSchema);
