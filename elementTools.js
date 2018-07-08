const elementTypes = require('./elementTypes');
const isQuickReply = (c) => c.type === elementTypes.QUICK_REPLY; // todo inconsistent
const isNotQuickReply = (c) => {
    if (typeof c !== 'object') {
        return false;
    }
    return c.type !== elementTypes.QUICK_REPLY
};

const isAPICall = (c) => {
    return c.type === elementTypes.API
};

const elementTools = {
    isQuickReply, isNotQuickReply, isAPICall
};

module.exports = elementTools;