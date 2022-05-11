const { Schema, model } = require('mongoose');

const connectionSchema = new Schema({
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
},
{ 
    timestamps: true 
});

module.exports = model('Connection', connectionSchema);


// userId:
// matchId:
// timestamp:
// percentage:
// similarInterest:[]