const TelegramBot = require('node-telegram-bot-api');
const token = '1153832709:AAGankVoSsB_jd8aDinyVJAGEhCuS9STMN8';
const bot = new TelegramBot(token, { polling: true });
const randomImages = require('./images');

let questions = [
    {
        title: 'Начать тест на петуха?',
        buttons: [
            [{ text: 'ДА', callback_data: '0_1' }],
            [{ text: 'Я ЗАССА', callbackData: '0_2' }],
        ],
        rightAnswer: 1,
    },
];
//msg.chat.id и msg.from.id думаю можно в константы вынести

//Показывает ошибки подробнее
bot.on('polling_error', (err) => console.log(err));

bot.onText(/\/start_test/, (msg) => {
    //-- оставлю чтоб просто было
    bot.sendMessage(msg.chat.id, 'Здарова', {
        reply_markup: {
            keyboard: ['/randomPic'],
        },
    });
    //---
});

bot.onText(/\/echo (.+)/, (msg, match) => {
    var fromId = msg.from.id; // Получаем ID отправителя
    var resp = match[1]; // Получаем текст после /echo

    bot.sendMessage(fromId, resp);
});
bot.on('message', (msg) => {
    //console.log(msg.text.includes('петух'));

    //хызы как это под кейс переписать
    if (msg.text.toString().toLowerCase().includes('пидор')) {
        bot.sendMessage(msg.chat.id, 'БАААН');
    }
    switch (msg.text.toString().toLowerCase()) {
        //
        // case msg.text.includes('ты петух').toString():
        //     bot.sendMessage(msg.chat.id, 'БАААН');
        //     break;
        case 'kick me': //только в группах
            bot.kickChatMember(msg.chat.id, msg.from.id);
            break;
        case 'где чалишь':
        case 'где сидишь':
            bot.sendLocation(msg.chat.id, 51.155034, 54.994556);
            bot.sendMessage(msg.chat.id, 'В Черном дельфине чалю');
            break;
        case 'ауе':
            bot.sendMessage(msg.chat.id, 'Фартук в масле оливье');
            break;
        case 'ауе пацан':
            bot.sendPhoto(
                msg.chat.id,
                'https://static.mk.ru/upload/entities/2017/11/15/articles/detailPicture/e1/10/d5/fe/3d6b3059225fdbb457bc8dfffbeedf77.jpg',
                { caption: 'aye' },
            );
            break;
        case 'йоу':
        case 'hi':
        case 'хай':
            bot.sendMessage(msg.chat.id, 'С пидорами не общаюсь');
            break;
        case 'вечер в хату':
            bot.sendMessage(
                msg.chat.id,
                'Часик в радость ' +
                    msg.from.first_name +
                    '. Чифир тебе в сладость',
            );
            break;
        case 'здарова':
        case 'привет':
            bot.sendMessage(msg.chat.id, 'Здарова, бандит! Как житуха?');
            break;
        case 'кисилечек':
            bot.sendVideo(
                msg.chat.id,
                'https://cs5-2v4.vkuservideo.net/p7/1f68e18f839d.720.mp4?extra=INu6do6jCEMdY9Uf8AosekYmwyHPLXoZt2aRVlo3pcEN4B2tiRM0Ou4NNH3kfpg5D5hZGxmTuRpie24PLp18cWjROx3C8hyQEvKREMiLT64UvfOn347RD3LW9zOFfiUzc6uCY8s3OlTu8ZCLm64HmnDB3A&c_uniq_tag=JAprUnbusG88Ba6nXVzI_WZLURKAEmvRo8aHUPm62Vw',
                { caption: 'Хуху. Вот у нас два мальчика катаются, не один' },
            );

            break;
        default:
            bot.sendMessage(
                msg.chat.id,
                'Значит говоришь " ' + msg.text + ' ". Да ты петух походу!',
            );
    }
});

bot.onText(/\/randompic/, (msg) => {
    let fromId = msg.chat.id;

    bot.sendPhoto(
        fromId,
        randomImages[Math.floor(Math.random() * randomImages.length)],
        { caption: 'aye' },
    );
});

/*---
 test na pidora

----
var questions = [
  {
    title:'Сколько параметров можно передать функции ?',
    buttons: [
        [{ text: 'Ровно столько, сколько указано в определении функции.', callback_data: '0_1' }],
        [{ text: 'Сколько указано в определении функции или меньше.', callback_data: '0_2' }],
        [{ text: 'Сколько указано в определении функции или больше.', callback_data: '0_3' }],
        [{ text: 'Любое количество.', callback_data: '0_4' }]
      ],
    right_answer: 4
  },
  {
    title:'Чему равна переменная name?\nvar name = "пупкин".replace("п", "д")',
    buttons: [
        [{ text: 'дудкин', callback_data: '1_1' }],
        [{ text: 'дупкин', callback_data: '1_2' }],
        [{ text: 'пупкин', callback_data: '1_3' }],
        [{ text: 'ляпкин-тяпкин', callback_data: '1_4' }]
      ],
    right_answer: 2
  },
  {
    title:'Чему равно 0 || "" || 2 || true ?',
    buttons: [
        [{ text: '0', callback_data: '2_1' }],
        [{ text: '""', callback_data: '2_2' }],
        [{ text: '2', callback_data: '2_3' }],
        [{ text: 'true', callback_data: '2_4' }]
      ],
    right_answer: 3
  },
];

function getRandomQuestion(){
  return questions[Math.floor(Math.random()*questions.length)];
}

function newQuestion(msg){
  var arr = getRandomQuestion();
  var text = arr.title;
  var options = {
    reply_markup: JSON.stringify({
      inline_keyboard: arr.buttons,
      parse_mode: 'Markdown'
    })
  };
  chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
  bot.sendMessage(chat, text, options);
}

bot.onText(/\/start_test/, function (msg, match) {
  newQuestion(msg);
});

bot.on('callback_query', function (msg) {
  var answer = msg.data.split('_');
  var index = answer[0];
  var button = answer[1];

  if (questions[index].right_answer==button) {
    bot.sendMessage(msg.from.id, 'Ответ верный ✅');
  } else {
    bot.sendMessage(msg.from.id, 'Ответ неверный ❌');
  }

  bot.answerCallbackQuery(msg.id, 'Вы выбрали: '+ msg.data, true);
  newQuestion(msg);
});

----
*/
