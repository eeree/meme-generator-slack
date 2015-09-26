//noinspection JSUnresolvedFunction
var config = require('../../config/config');
//noinspection JSUnresolvedFunction
var unirest = require('unirest');

/**
 * @param {Channel} channel
 * @constructor
 */
function MemeGenerator(channel) {
    this.channel = channel;
}

MemeGenerator.prototype.displayRandom = function() {
    var _this = this,
        qs = {
        'languageCode': 'en',
        'pageIndex': Math.ceil(Math.random() * 500),
        'pageSize': 1,
        'days': null,
        'urlName': null
    };

    //noinspection JSUnresolvedFunction
    unirest.get(config.meme_generator.url)
        .query(qs)
        .end(function (response) {
            //noinspection JSUnresolvedVariable
            if (true === response.body.success && response.body.result.length) {
                //noinspection JSUnresolvedVariable
                _this.channel.send(response.body.result[0].instanceImageUrl);
            } else {
                _this.channel.send("I dunno. I really can't handle your request.");
            }
        });
};

//noinspection JSUnresolvedVariable
module.exports = MemeGenerator;
