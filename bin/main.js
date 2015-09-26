//noinspection JSUnresolvedFunction
var config = require('../config/config.js');
//noinspection JSUnresolvedFunction
var request = require('request');
//noinspection JSUnresolvedFunction
var Slack = require('slack-client');
//noinspection JSUnresolvedFunction
var SlackMessage = require('./models/slack_message');
//noinspection JSUnresolvedFunction
var Meme = require('./models/img_flip_meme');
//noinspection JSUnresolvedFunction
var MemeGenerator = require('./services/meme_generator');
//noinspection JSUnresolvedFunction
var slack = new Slack(config.token, true, true);

//noinspection JSUnresolvedFunction
slack.on('open', function () {
    var channels = Object.keys(slack.channels)
        .map(function (k) { return slack.channels[k]; })
        .filter(function (c) { return c.is_member; })
        .map(function (c) { return c.name; });

    var groups = Object.keys(slack.groups)
        .map(function (k) { return slack.groups[k]; })
        .filter(function (g) { return g.is_open && !g.is_archived; })
        .map(function (g) { return g.name; });

    console.log('Welcome to Slack. You are ' + slack.self.name + ' of ' + slack.team.name);

    if (channels.length > 0) {
        console.log('You are in: ' + channels.join(', '));
    }
    else {
        console.log('You are not in any channels.');
    }

    if (groups.length > 0) {
        console.log('As well as: ' + groups.join(', '));
    }
});

//noinspection JSUnresolvedFunction
slack.on('message', function(message) {
    try {
        var channel = slack.getChannelGroupOrDMByID(message.channel),
            slackMessage = new SlackMessage(message, slack);

        if (!slackMessage.isValid() || !slackMessage.isDirect()) {
            return;
        }

        if (slackMessage.isEmpty()) {
            new MemeGenerator(channel).displayRandom();
            return;
        }

        var memeEntity = new Meme(slackMessage);
        if (!memeEntity.isValid()) {
            channel.send("Sorry, but I couldn't parse your command.\nBut no worries! Here comes a random meme.");
            new MemeGenerator(channel).displayRandom();
            return;
        }

        var qs = {
            'username': config.img_flip.login,
            'password': config.img_flip.password,
            'template_id': memeEntity.getTemplateId(),
            'text0': memeEntity.getText()[0],
            'text1': memeEntity.getText()[1]
        };
        request({
            'url': config.img_flip.url,
            'method': "POST",
            'json': true,
            'qs': qs
        }, function (error, response, body) {
            //noinspection JSUnresolvedVariable
            if (true === body.success) {
                channel.send(body.data.url);
            } else {
                channel.send("Oops. Something went wrong, while processing your request.\nServing a random meme instead.");
                new MemeGenerator(channel).displayRandom();
            }
        });
    } catch(e) {
        console.log('Exception occurred: ' + e.message);
    }
});

slack.login();
