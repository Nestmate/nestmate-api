const { Schema, model } = require('mongoose');

const interestSchema = new Schema({
   name: {
        type: String,
        required: true
    },
    emoji: {
        type: String,
        default: '💡'
    }
});

module.exports = model('Interest', interestSchema);

// Label
// description
// Emoji
// category (category id)