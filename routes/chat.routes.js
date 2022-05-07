module.exports = (io = null) => {

    const router = require("express").Router();
    const Chat = require('../models/Chat.model');
    const Message = require('../models/Message.model');
    const isAuthUser = require("../helpers/isAuthUser");

    //GET ALL CHATS
    router.get('/', async (req, res) => {

        try {

            const authUser = await isAuthUser(req);
            if(!authUser) return res.status(401).json({ msg: "Unauthorized" });
            console.log('authUser _id => ', authUser?._id);
            const chats = await Chat.find({ users: authUser._id }).populate('lastMessage users');
            res.status(200).json({ chats });

        } catch (err) {

            res.status(500).json({ message: err });

        }
    });

    //GET MESSAGES FOR A CHAT
    router.get('/:chatId', async (req, res) => {
        
        try {
            const { chatId } = req.params;
            const chat = await Chat.findOne({_id:chatId}).populate({
                path : 'messages',
                populate : {
                    path : 'user',
                    'select' : '_id firstName lastName profilePicture'
                }
            }).populate('users');
        
            res.status(200).json({ chat });

        } catch (err) {

            res.status(500).json({ message: err });
            
        }

    });

    //CREATE NEW CHAT
    router.post('/', async (req, res) => {
        try {
            
            const { users, messages } = req.body;
            const chat = await Chat.create({ users, messages });
            res.status(200).json(chat);

        } catch (err) {

            res.status(500).json({ message: err });
        }

    });


    //NEW MESSAGE
    router.post('/:chat', async (req, res) => {

        try {

            const { chat } = req.params;
            const { message, user } = req.body;
            const newMessage = await Message.create({ message, chat, user });
            
            await Chat.findByIdAndUpdate({ _id:chat }, { lastMessage: newMessage._id , $push: { messages: newMessage._id } }, { new: true });
            //io.to(chat).emit('message', newMessage);
            //io.emit("message", newMessage);
            //io.emit('message', newMessage);

            res.status(200).json({ newMessage });

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err });
        }
    });

    return router;

    
}




