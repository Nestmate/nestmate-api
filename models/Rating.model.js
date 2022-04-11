const { Schema, model } = require('mongoose');

const ratingSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    ratedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, required: true },
    title: { type: String, required: true },
    comment: { type: String, required: true },
    isPublic: { type: Boolean, required: true },    
},
{ 
    timestamps: true 
});

module.exports = model('Rating', ratingSchema);