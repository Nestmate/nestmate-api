const { Schema, model } = require('mongoose');

const notificationSchema = new Schema({
    type: { type: String, enum: ['connection', 'message'] , required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    link: { type: String , default: '/mates' },
    isRead: { type: Boolean, default: false }
},
{ 
    timestamps: true 
});

module.exports = model('Notification', notificationSchema);