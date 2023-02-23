const TelegramApi = require('node-telegram-bot-api')

const {gameOptions, againOptions} = require('./options')

const token = '6107551291:AAFCytzH7SCrpAe3C69yer89tmIC2PxBdyw'

const bot = new TelegramApi(token, {polling: true})

const chats = {}

const startGame = async (chatId) => {
 
   	 await bot.sendMessage(chatId, 'Сейчас я загадаю цифру от   0 до 9, а ты должен ее угадать!')
     const randomNumber = Math.floor(Math.random()* 10);
     chats[chatId] = randomNumber;
     await bot.sendMessage(chatId,  'Отгадывай', gameOptions );
  
}
//const start = () =>{
bot.setMyCommands([
   
    {command: '/start', description: 'Начальное приветствие'},
    {command: '/info', description: 'Получить информацию о пользователе'},
    {command: '/game', description: 'Игра угадай цифру'},
	]);
bot.on( 'message',    async msg => {
	const text = msg.text;
	const chatId = msg.chat.id;	
	if (text ==='/start') {
   await bot.sendSticker(chatId, 'https://chpic.su/_data/archived/stickers/p/pr/ProgerRobots_byAlexzhdanov.webp')	
     return bot.sendMessage(chatId, `Добро пожаловать в стан белых хакеров `)
	}
	if (text === '/info') {
		return bot.sendMessage(chatId, `тебя зовут ${msg.from.first_name} `)
	}
	if (text === '/game') {
     return startGame(chatId);
	}
	return bot.sendMessage(chatId, ' Я тебя не понимаю, попробуй еще раз')
})

bot.on( 'callback_query', async msg => {
	const data = msg.data;
	const chatId = msg.message.chat.id;
	if (data === '/again') {
    return startGame(chatId);
	}
    if (data == chats[chatId]) {
  	await bot.sendMessage(chatId, `Ураааа, поздравляю ты отгадал цифру))) это число было ${chats[chatId]}`, againOptions);
    
    } else {
    
    	return bot.sendMessage(chatId, `Ты не угадал, бот загадал цифру ${chats[chatId]}`, againOptions);
    
    }


	
})

//}

//start()


