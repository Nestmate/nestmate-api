const router = require("express").Router();
const Interest = require('../models/Interest.model');

// const interestsList = [{"name":"3D printing","emoji":"🖨"},{"name":"Amateur radio","emoji":"📻"},{"name":"Scrapbook","emoji":"📓"},{"name":"Acting","emoji":"🎭"},{"name":"Baton twirling","emoji":"🎗"},{"name":"Board games","emoji":"🎲"},{"name":"Book restoration","emoji":"📚"},{"name":"Cabaret","emoji":"👯"},{"name":"Calligraphy","emoji":"🖋"},{"name":"Candle making","emoji":"🕯"},{"name":"Computer programming","emoji":"💾"},{"name":"Coffee roasting","emoji":"☕️"},{"name":"Cooking","emoji":"🧑‍🍳"},{"name":"Colouring","emoji":"🎨"},{"name":"Cosplaying","emoji":"🦄"},{"name":"Couponing","emoji":"🎟"},{"name":"Creative writing","emoji":"✍️"},{"name":"Crocheting","emoji":"🪡"},{"name":"Cryptography","emoji":"🧮"},{"name":"Dance","emoji":"💡"},{"name":"Digital arts","emoji":"🖥"},{"name":"Drama","emoji":"🎭"},{"name":"Drawing","emoji":"✏️"},{"name":"Do it yourself","emoji":"🛠"},{"name":"Electronics","emoji":"💡"},{"name":"Embroidery","emoji":"🪡"},{"name":"Fashion","emoji":"🧢"},{"name":"Flower arranging","emoji":"🌸"},{"name":"Foreign language learning","emoji":"💡"},{"name":"Gaming","emoji":"🕹"},{"name":"Tabletop games","emoji":"👾"},{"name":"Role-playing games","emoji":"🕵️"},{"name":"Gambling","emoji":"🎰"},{"name":"Genealogy","emoji":"🚺"},{"name":"Glassblowing","emoji":"🫙"},{"name":"Gunsmithing","emoji":"🔫"},{"name":"Homebrewing","emoji":"🍺"},{"name":"Ice skating","emoji":"⛸"},{"name":"Jewelry making","emoji":"💍"},{"name":"Jigsaw puzzles","emoji":"🧩"},{"name":"Juggling","emoji":"🤹"},{"name":"Knitting","emoji":"🪡"},{"name":"Knife making","emoji":"🗡"},{"name":"Lacemaking","emoji":"➰"},{"name":"Lapidary","emoji":"💡"},{"name":"Leather crafting","emoji":"👞"},{"name":"Lego building","emoji":"🧊"},{"name":"Lockpicking","emoji":"🔐"},{"name":"Machining","emoji":"⚙️"},{"name":"Macrame","emoji":"✏️"},{"name":"Metalworking","emoji":"🔩"},{"name":"Magic","emoji":"🪄"},{"name":"Model building","emoji":"🏠"},{"name":"Listening to music","emoji":"🎵"},{"name":"Origami","emoji":"📃"},{"name":"Painting","emoji":"🧑‍🎨"},{"name":"Playing musical instruments","emoji":"🎸"},{"name":"Pet","emoji":"🐶"},{"name":"Poi","emoji":"💡"},{"name":"Pottery","emoji":"💡"},{"name":"Puzzles","emoji":"🧩"},{"name":"Quilting","emoji":"🪶"},{"name":"Reading","emoji":"📖"},{"name":"Sculpting","emoji":"🎨"},{"name":"Sewing","emoji":"🪡"},{"name":"Singing","emoji":"🎤"},{"name":"Sketching","emoji":"✏️"},{"name":"Soapmaking","emoji":"🧼"},{"name":"Sports","emoji":"⚽️"},{"name":"Stand-up comedy","emoji":"🤣"},{"name":"Sudoku","emoji":"🧩"},{"name":"Table tennis","emoji":"🏓"},{"name":"Taxidermy","emoji":"🐗"},{"name":"Video gaming","emoji":"👾"},{"name":"Watching movies","emoji":"🍿"},{"name":"Web surfing","emoji":"🧑‍💻"},{"name":"Whittling","emoji":"💡"},{"name":"Wood carving","emoji":"🪵"},{"name":"Woodworking","emoji":"🪵"},{"name":"World Building","emoji":"💡"},{"name":"Writing","emoji":"💡"},{"name":"Yoga","emoji":"💡"},{"name":"Yo-yoing","emoji":"💡"},{"name":"Air sports","emoji":"💡"},{"name":"Archery","emoji":"💡"},{"name":"Astronomy","emoji":"💡"},{"name":"Backpacking","emoji":"💡"},{"name":"Base jumping","emoji":"💡"},{"name":"Baseball","emoji":"💡"},{"name":"Basketball","emoji":"💡"},{"name":"Beekeeping","emoji":"💡"},{"name":"Bird watching","emoji":"💡"},{"name":"Blacksmithing","emoji":"💡"},{"name":"Board sports","emoji":"💡"},{"name":"Bodybuilding","emoji":"💡"},{"name":"Brazilian jiu-jitsu","emoji":"💡"},{"name":"Community","emoji":"💡"},{"name":"Cycling","emoji":"💡"},{"name":"Dowsing","emoji":"💡"},{"name":"Driving","emoji":"💡"},{"name":"Fishing","emoji":"💡"},{"name":"Flag football","emoji":"💡"},{"name":"Flying","emoji":"💡"},{"name":"Flying disc","emoji":"💡"},{"name":"Foraging","emoji":"💡"},{"name":"Gardening","emoji":"💡"},{"name":"Geocaching","emoji":"💡"},{"name":"Ghost hunting","emoji":"💡"},{"name":"Graffiti","emoji":"💡"},{"name":"Handball","emoji":"💡"},{"name":"Hiking","emoji":"💡"},{"name":"Hooping","emoji":"💡"},{"name":"Horseback riding","emoji":"💡"},{"name":"Hunting","emoji":"💡"},{"name":"Inline skating","emoji":"💡"},{"name":"Jogging","emoji":"💡"},{"name":"Kayaking","emoji":"💡"},{"name":"Kite flying","emoji":"💡"},{"name":"Kitesurfing","emoji":"💡"},{"name":"Larping","emoji":"💡"},{"name":"Letterboxing","emoji":"💡"},{"name":"Metal detecting","emoji":"💡"},{"name":"Motor sports","emoji":"💡"},{"name":"Mountain biking","emoji":"💡"},{"name":"Mountaineering","emoji":"💡"},{"name":"Mushroom hunting","emoji":"💡"},{"name":"Mycology","emoji":"💡"},{"name":"Netball","emoji":"💡"},{"name":"Nordic skating","emoji":"💡"},{"name":"Orienteering","emoji":"💡"},{"name":"Paintball","emoji":"💡"},{"name":"Parkour","emoji":"💡"},{"name":"Photography","emoji":"💡"},{"name":"Polo","emoji":"💡"},{"name":"Rafting","emoji":"💡"},{"name":"Rappelling","emoji":"💡"},{"name":"Rock climbing","emoji":"💡"},{"name":"Roller skating","emoji":"💡"},{"name":"Rugby","emoji":"💡"},{"name":"Running","emoji":"💡"},{"name":"Sailing","emoji":"💡"},{"name":"Sand art","emoji":"💡"},{"name":"Scouting","emoji":"💡"},{"name":"Scuba diving","emoji":"💡"},{"name":"Sculling","emoji":"💡"},{"name":"Rowing","emoji":"💡"},{"name":"Shooting","emoji":"💡"},{"name":"Shopping","emoji":"💡"},{"name":"Skateboarding","emoji":"💡"},{"name":"Skiing","emoji":"💡"},{"name":"Skim Boarding","emoji":"💡"},{"name":"Skydiving","emoji":"💡"},{"name":"Slacklining","emoji":"💡"},{"name":"Snowboarding","emoji":"💡"},{"name":"Stone skipping","emoji":"💡"},{"name":"Surfing","emoji":"💡"},{"name":"Swimming","emoji":"💡"},{"name":"Taekwondo","emoji":"💡"},{"name":"Tai chi","emoji":"💡"},{"name":"Urban exploration","emoji":"💡"},{"name":"Vacation","emoji":"💡"},{"name":"Vehicle restoration","emoji":"💡"},{"name":"Water sports","emoji":"💡"}]

router.get('/', async (req, res) => {
    try {
        const interests = await Interest.find();

        res.status(200).json(interests);

    } catch (err) {

        res.status(500).json({ message: err });

    }
});


// router.get('/batch', async (req, res) => {

//     try{
//         // const manyInterest = interestsList.map(interest => { return { name: interest } });
//         // console.log(interestsList);
//         const interests = await Interest.insertMany(interestsList);
//         res.status(200).json(interests);

//     }catch(e){
//         res.status(500).json({ message: e });
//     }
// });


module.exports = router;