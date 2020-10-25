
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


const reportSchema = new mongoose.Schema({
    name: { type: String, default: '' },
    description: { type: String, default: '' },
    photo_url: { type: String, default: '' },
    isResolved: { type: Boolean, default: false},
    reported_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reported_to: { type: mongoose.Schema.Types.ObjectId, ref: 'Municipal' },
    location: {
        type: {
            type: String, 
            enum: ['Point'],
            //required: true
        },
        coordinates: {
            type: [Number],
            ///required: true
            index : '2dsphere'
        }
    }
    },
    {
        toObject: { getters: true },
        timestamps: {
            createdAt: 'created_at', 
            updatedAt: 'updated_at'
    },
    

})

reportSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Reports', reportSchema);
