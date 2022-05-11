module.exports = (io) => {

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

            const chats = await Chat.find({ users: authUser._id },{ messages: { $slice: -10 }}).populate({
                path : 'messages',
                populate : {
                    path : 'user',
                    'select' : '_id firstName lastName profilePicture'
                }
            }).populate('users lastMessage');

            res.status(200).json({ chats });

        } catch (err) {

            res.status(500).json({ message: err });

        }
    });

    //GET MESSAGES FOR A CHAT
    router.get('/:chatId', async (req, res) => {
        
        try {
            const { chatId } = req.params;
            const chat = await Chat.findOne({_id:chatId},{ messages: { $slice: -10 }}).populate({
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
            
            const { users, message } = req.body;
            const authUser = await isAuthUser(req);

            if(!authUser) return res.status(401).json({ msg: "Unauthorized" });

            let chat = await Chat.findOne({ users: { $all: users } });

            console.log('Chat exists',{ chat });
            let newMessage;
            
            if(!chat) chat = await Chat.create({ users });

            newMessage = await Message.create({ message, chat: chat._id, user:authUser._id });

            chat = await Chat.findByIdAndUpdate({ _id: chat._id }, { lastMessage: newMessage._id , $push: { messages: newMessage._id } }, { new: true });
            
            res.status(200).json(chat);

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err });
        }

    });


    //NEW MESSAGE
    router.post('/:chat', async (req, res) => {

        try {

            const { chat } = req.params;
            const { message, user } = req.body;
            const newMessage = await Message.create({ message, chat, user });
           
            const currChat = await Chat.findByIdAndUpdate({ _id:chat }, { lastMessage: newMessage._id , $push: { messages: newMessage._id } }, { new: true }).populate('users');
            console.log( currChat );
            await newMessage.populate('user');

            
            
            io.to( chat ).emit('message', { chatId:chat, message: newMessage });
            
            currChat.users.forEach(({ _id }) => io.to( _id.toString() ).emit('update_chat', { chat:currChat }));

            res.status(200).json({ newMessage });

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err });
        }
    });

    return router;

    
}




