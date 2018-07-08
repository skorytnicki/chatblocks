const elementTypes = require('../elementTypes');
function QuickReplies(props, ...children) {
    return {
        type: elementTypes.QUICK_REPLY,
        quickReplies: children
    };
}

module.exports = QuickReplies;