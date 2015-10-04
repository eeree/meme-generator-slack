# meme-generator-slack
Node.js implementation of a meme generator slack bot.

# Installing

1. Make sure you've got Node.js installed, if not, install it from: https://nodejs.org/en
2. Clone the repository: `git clone git@github.com:eeree/meme-generator-slack.git`
3. Install dependencies by running: `npm install` in directory, where you copied repository
4. Edit `.\config\config.js` providing valid token of your bot and valid credentials from https://imgflip.com/ website
5. Run bot with `node .\bin\main.js`

# How to use

1. Open Slack setting page and add new integration
2. Select chat-bot integration and fill the required fields
3. Copy generated token and insert it into `.\config\config.js`
4. Register on https://imgflip.com/ and insert credentials to the same file
5. Invite a bot to a group or write directly
6. Example commands (let's say your bot is named meme)
  * @meme: | empty message will display random meme
  * @meme: grumpy cat HEY BOT | will display grumpy cat meme with text "HEY BOT" on a bottom
  * @meme: This bot is too damn hot | will display meme with "This bot is" text on top and "too damn hot" text on bottom
7. You can check a list of possibilities in `./config/memes.js` file.

Have fun!

# Others

Bot uses two services to generate memes for you:
  * http://memegenerator.net/ (used to provide you a random meme)
  * https://imgflip.com/ (used to generate a meme based on what you provided)
All credits go to companies behind those services.
