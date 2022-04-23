const { Schema, model } = require('mongoose');

const mateSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    mate: { type: Schema.Types.ObjectId, ref: 'User' },
    precentage: { type: Number, required: true },
    interests: [{ type: Schema.Types.ObjectId, ref: 'Interest' }]  
},
{ 
    timestamps: true 
});

module.exports = model('Mate', mateSchema);


// userId:
// matchId:
// timestamp:
// percentage:
// similarInterest:[]