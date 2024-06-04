const TelegramBot = require('node-telegram-bot-api');
const request = require('request').defaults({ encoding: null });
const fs = require('fs');
const http = require('http');

const token = '6531689450:AAFNTGx4bafhOll-pS2ySRRs7eAsILA9iUw';
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Welcome! I'll start sending you a random image from Unsplash every 5 seconds.");

    // Start sending photos every 5 seconds
    setInterval(() => {
        // Fetch a random image from Unsplash
        request.get('https://source.unsplash.com/random', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                fs.writeFileSync('output.png', body);
                bot.sendPhoto(msg.chat.id, 'output.png');
            }
        });
    }, 5000);  // 5000 milliseconds = 5 seconds
});

bot.on('message', (msg) => {
    // This bot will now only respond to /start command
});

// Create a basic server that listens on a port
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});

const port = process.env.PORT || 3000;  // Use the PORT environment variable if it's available

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
