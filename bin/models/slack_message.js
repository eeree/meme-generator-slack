/**
 * Object representation of chat message
 * @param {Object} msg
 * @param {Object} slack
 * @constructor
 */
function SlackMessage(msg, slack) {
    this.msg = msg;
    this.slack = slack;
    this.msg_chunks = null;
    this.setChunks();
    if (this.msg_chunks === null) {
        throw "Not a valid Slack message!"
    }
}

/**
 * @returns {SlackMessage}
 */
SlackMessage.prototype.setChunks = function() {
    this.msg_chunks = new RegExp('^(<@([a-zA-Z0-9]*)>):? ?(.*)$').exec(this.msg.text);
    return this;
};

/**
 * @returns {string}
 */
SlackMessage.prototype.getMention = function() {
    return this.msg_chunks[1];
};

/**
 * @returns {string}
 */
SlackMessage.prototype.getRecipient = function() {
    return this.msg_chunks[2];
};

/**
 * @returns {string}
 */
SlackMessage.prototype.getBody = function() {
    return this.msg_chunks[3].trim();
};

/**
 * @returns {boolean}
 */
SlackMessage.prototype.isValid = function() {
    return this.msg.type === 'message' && this.msg.text.length;
};

/**
 * @returns {boolean}
 */
SlackMessage.prototype.isEmpty = function() {
    return this.getBody() <= 0;
};

/**
 * @returns {boolean}
 */
SlackMessage.prototype.isDirect = function() {
    return this.slack.self.id === this.getRecipient();
};

//noinspection JSUnresolvedVariable
module.exports = SlackMessage;
