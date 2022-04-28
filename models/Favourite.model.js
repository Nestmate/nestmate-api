const { Schema, model } = require('mongoose');

const favouriteSchema = new Schema({
   user: { type: Schema.Types.ObjectId, ref: "User" },
   mate: { type: Schema.Types.ObjectId, ref: "User" }
},
{ 
    timestamps: true 
});


module.exports = model('Favourite', favouriteSchema);

// Label
// description
// Emoji
// category (category id)