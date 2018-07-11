const createAPIElement = require("../createAPIElement");
const elementTools = require("../elementTools");
const {isQuickReply, isNotQuickReply} = elementTools;

function ButtonTemplate(props, ...children) {
    const buttons = children.filter(isNotQuickReply);
    let data = {
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text: props.text,
                    buttons: buttons,
                    sharable: props ? !!props.sharable : false
                }
            }
        }
    };
    const quickReply = children.find(isQuickReply);

    if (quickReply) {
        data.message.quick_replies = quickReply.quickReplies;
    }

    return createAPIElement(data)
}

module.exports = ButtonTemplate;