const { Schema, model } = require('mongoose');

const interestSchema = new Schema({
   name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true  
    },
    emoji: {
        type: String,
        required: true,
        default: '💡'
    },
    category: { type: Schema.Types.ObjectId, ref: "Category" }
});

module.exports = model('Interest', interestSchema);

// Label
// description
// Emoji
// category (category id)