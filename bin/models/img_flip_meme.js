//noinspection JSUnresolvedFunction
var memes = require('../../config/memes.js');

/**
 * Image Flip meme entity object representation
 * @param {SlackMessage} msg
 * @constructor
 */
function ImgFlipMeme(msg) {
    this.msg = msg;
    this.entity = this.getMemeEntity();
}

/**
 * @returns {{template_id: number, text0: string, text1: string}}
 */
ImgFlipMeme.prototype.getMemeEntity = function() {
    var entity = {
        template_id: 0,
        text0: '',
        text1: ''
    };

    for (var i = 0, l = memes.list.length; i < l; i++) {
        var matches = this.msg.getBody().match(memes.list[i]['regex']);
        if (matches) {
            entity.template_id = memes.list[i]['template_id'];
            entity.text0 = matches[1];
            entity.text1 = matches[2];
            break;
        }
    }

    return entity;
};

/**
 * @returns {number}
 */
ImgFlipMeme.prototype.getTemplateId = function() {
    return this.entity.template_id;
};

/**
 * @returns {Array}
 */
ImgFlipMeme.prototype.getText = function() {
    return [this.entity.text0, this.entity.text1];
};

/**
 * @returns {boolean}
 */
ImgFlipMeme.prototype.isValid = function() {
    var isCorrectId = !isNaN(+this.entity.template_id) && isFinite(this.entity.template_id) && this.entity.template_id > 0,
        isCorrectText = this.entity.text0.length > 0 || this.entity.text1.length > 0;
    return  isCorrectId && isCorrectText;
};

//noinspection JSUnresolvedVariable
module.exports = ImgFlipMeme;
