const createAPIElement = require("../createAPIElement");
const elementTools = require("../elementTools");
const {isQuickReply, isNotQuickReply} = elementTools;

function Text(props, ...children) {
    const text = children.filter(isNotQuickReply);

    let data = {
        message: {
            text: text.join("")
        }
    };
    const quickReply = children.find(isQuickReply);

    if (quickReply) {
        data.message.quick_replies = quickReply.quickReplies;
    }

    return createAPIElement(data)
}

module.exports = Text;