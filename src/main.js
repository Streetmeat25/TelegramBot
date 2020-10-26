const TelegramBot = require('node-telegram-bot-api');
const token = '1153832709:AAGankVoSsB_jd8aDinyVJAGEhCuS9STMN8';
const bot = new TelegramBot(token, { polling: true });
const randomImages = require('./images');

//Показывает ошибки подробнее
bot.on('polling_error', (err) => console.log(err));

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Welcome', {
        reply_markup: {
            keyboard: [['/randomPic']],
        },
    });
});

bot.onText(/\/echo (.+)/, (msg, match) => {
    var fromId = msg.from.id; // Получаем ID отправителя
    var resp = match[1]; // Получаем текст после /echo

    bot.sendMessage(fromId, resp);
});

bot.on('message', (msg) => {
    //переписать через кейсы

    if (msg.text.toLowerCase() == 'ауепацан') {
        bot.sendPhoto(
            msg.chat.id,
            'https://static.mk.ru/upload/entities/2017/11/15/articles/detailPicture/e1/10/d5/fe/3d6b3059225fdbb457bc8dfffbeedf77.jpg',
            { caption: 'aye' },
        );
    } else bot.sendMessage(msg.chat.id, 'aye');
});

bot.onText(/\/randomPic/, (msg) => {
    let fromId = msg.chat.id;

    bot.sendPhoto(
        fromId,
        randomImages[Math.floor(Math.random() * randomImages.length)],
        { caption: 'aye' },
    );
});
