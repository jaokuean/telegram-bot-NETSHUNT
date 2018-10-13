'use strict';
var firebase = require('firebase');
const app = firebase.initializeApp({
    apiKey: "AIzaSyA7zKSEoYrTTUkJgjxi44m9SYNHrRTI4n0",
    authDomain: "netshunt.firebaseapp.com",
    databaseURL: "https://netshunt.firebaseio.com",
    projectId: "netshunt",
    storageBucket: "",
    messagingSenderId: "564420513777"
  });
  const ref = firebase.database().ref();
  const sitesRef = ref.child("sites");
  


// const Telegram = require('telegram-node-bot'),
//     PersistentMemoryStorage = require('./Adapters/PersistentMemoryStorage'),
//     storage = new PersistentMemoryStorage(
//         `${__dirname}/data/userStorage.json`,
//         `${__dirname}/data/chatStorage.json`
//     ),
//     tg = new Telegram.Telegram('640995863:AAHZkQutGDOjIwlHp8iNiUJXDV3E5HN5TSc', {
//         workers: 1,
//         storage: storage
//     });

// const TodoController = require('./controllers/todo')
//     , OtherwiseController = require('./controllers/otherwise');

// const todoCtrl = new TodoController();

// tg.router.when(new Telegram.TextCommand('/add', 'addCommand'), todoCtrl)
//     .when(new Telegram.TextCommand('/get', 'getCommand'), todoCtrl)
//     .when(new Telegram.TextCommand('/check', 'checkCommand'), todoCtrl)
//     .when(new Telegram.TextCommand('/upload','uploadCommand'), todoCtrl)
   
//     .otherwise(new OtherwiseController());



// function exitHandler(exitCode) {
//     storage.flush();
//     process.exit(exitCode);
// }


// process.on('SIGINT', exitHandler.bind(null, 0));
// process.on('uncaughtException', exitHandler.bind(null, 1));

const Bot = require('node-telegram-bot-api');
const request = require('request');
const token = '673670149:AAGSaL5dYzaT7zemjPZ_lWCU1Er5k3qOaiY';
const url = 'https://launchlibrary.net/1.3/launch';
const trigger = 'Send us a your Stan ID';
const bot = new Bot(token, {polling: true});

var opts = {
  reply_markup: JSON.stringify(
    {
      force_reply: true,
      keyboard: [['Over 18'],['Under 18']]
    }
  )};

bot.onText(/\/start/, (msg) => {
  console.log("CHAT ID :" + msg.chat.id);
  bot.sendMessage(msg.chat.id, "Welcome to NETS HUNT!");
  bot.sendMessage(msg.chat.id, "All the best for Hunt! :)");
  bot.sendMessage(msg.chat.id, "/send and your StanID \n(e.g /send 123456) to submit your entry to recevie a hint from us!");
  //bot.sendPhoto(msg.chat.id, photo='')  
  //bot.sendMessage(msg.chat.id, 'How old are you?', opts);
  
  bot.sendMessage(msg.chat.id, 'insert a name')
	.then(payload => {
		bot.once('message', (msg) => {
                       console.log(msg) // callback for sendMessage
               });
	})
});

//sending random hints
var textArray = [
  'Hint 1',
  'Hint 2'
];
var randomNumber = Math.floor(Math.random()*textArray.length);

bot.onText(/\/hint/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Copy your contestant chat id and click send.')
	.then(payload => {
		bot.once('message', (msg) => {
      console.log(msg) // callback for sendMessage
      var senderChatID = msg.text;
      if(!isNaN(senderChatID)&&senderChatID.length==9){
        console.log('RANDOM HINT CHECK IS TRUE');
        bot.sendMessage(senderChatID, randomHint);
        bot.sendMessage(msg.chat.id, 'Successfully send to <' + senderChatID+'>.' );
      }
      else if(isNaN(senderChatID)||senderChatID!=9){
        console.log('RANDOM HINT CHECK IS False');
        bot.sendMessage(msg.chat.id, 'You have entered an invalid chat id, please try again.');
         }
    });
	})
});

  bot.onText(/\/hint2(.+)$/, function (msg, match2) {
    var hintGiven = match2[1];
    console.log(' HINT INPUT:' + hintGiven);
    var hintIDtosend =hintGiven.toString().substring(2,11);
    console.log(' HINT CHAT ID:' + hintIDtosend);
    var hintTxt = hintGiven.toString().substring(12, hintGiven.length);
    console.log(' HINT MSG :' + hintTxt);
    var hintMsg = "Your hint! \n"+ hintTxt;
    console.log(' HINT MSG:' + hintMsg);


    if(!isNaN(hintIDtosend)&&hintIDtosend.length==9){
      console.log('HInt CHECK IS TRUE');
      bot.sendMessage(hintIDtosend, hintMsg);
      bot.sendMessage(msg.chat.id, 'Successfully send to <' + hintIDtosend+'>.' );
    }
    else if(isNaN(hintIDtosend)||hintIDtosend!=9){
      console.log('HInt CHECK IS False');
      bot.sendMessage(msg.chat.id, 'Please write in this format \n /hint<SPACE><CHATID><Hint>\n For example: \n /hint <123456789>Type your hint here.');
       }
    
   
        
    });
    bot.onText(/^\/send (.+)$/, function (msg, match) {
      var name = match[1];
      console.log('NAME INPUT:' + name);
      console.log('NAME INPUT LENGTH:' + name.length);
      console.log('NAME INPUT LENGTH:' + name);
      
      if(!isNaN(name)&&name.length==6){
        console.log('NAME CHECK IS TRUE');
         bot.sendMessage(msg.chat.id, 'Entry submitted:  ' + name + '!').then(function () {
          var msgSenttoAdmin = 'You have receive a message from ' + msg.chat.first_name + "<"+msg.chat.id+">"+ ".\n StanID: "+ name +"";
          var msgSentToUser = 'Thank You, we will send u a hint soon! ';
          bot.sendMessage(523818487, msgSenttoAdmin);
          bot.sendMessage(231029399, msgSenttoAdmin);
          bot.sendMessage(657953411, msgSenttoAdmin);
          bot.sendMessage(152236950, msgSenttoAdmin);
          bot.sendMessage(168517837, msgSenttoAdmin);
          bot.sendMessage(msg.chat.id, msgSentToUser);
        });
      }
      if(isNaN(name)||name.length!=6){
        console.log('NAME CHECK IS FALSE');
        var msgSentFail = "Your entry: "+name+", \n" + ' is an invalid entry. Please try again!' ;
        bot.sendMessage(msg.chat.id, msgSentFail);
      }
     
    });
    
bot.on('message', (msg) => {   
 
 if (msg.text.toString() === trigger) {
     var msgreturen = 'got new user' + msg.chat.id

     console.log('FILE NAME' + imagestr);
    bot.sendMessage( msg.chat.id,msgreturen );
 }
 if (msg.text.toString() === 'Check Hints') {
    var answers = [
        "Hint 1",
        "Hint 3",
        "Hint 4",
        "Hint 5", 
        "Hint 6 "
      ]
      
      var randomAnswer = answers[Math.floor(Math.random() * answers.length)];
      
      console.log(randomAnswer);
      bot.sendMessage(msg.chat.id, randomAnswer );
}
 

});


bot.on('polling_error', (error) => {
    console.log('polling errors - '+error.code);  // => 'EFATAL'
  });