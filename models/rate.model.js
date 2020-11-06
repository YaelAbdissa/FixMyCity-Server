
const mongoose = require('mongoose');


const RateSchema = new mongoose.Schema({
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    report:{ type: mongoose.Schema.Types.ObjectId, ref: 'Reports' },
    municipal:{ type: mongoose.Schema.Types.ObjectId, ref: 'Municipal' },
    rate_number: { type:Number },
    },
    {timestamps: {createdAt: 'created_at', modifiedAt: 'modified_at'}
});


module.exports = mongoose.model('Rates', RateSchema);
