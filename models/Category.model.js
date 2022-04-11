const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
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
    }
});

module.exports = model('Category', categorySchema);

// Label
// description
// Emoji
// category (category id)