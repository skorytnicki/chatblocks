const createAPIElement = require("../createAPIElement");
const elementTools = require("../elementTools");
const {isQuickReply, isNotQuickReply} = elementTools;

function MediaTemplate(props, ...children) {
    const buttons = children.filter(isNotQuickReply);
    let element = {
        media_type: props.mediaType
    };

    if (props.attachmentId) {
        element.attachment_id = props.attachmentId;
    }

    if (props.url) {
        element.url = props.url;
    }

    if (buttons.length === 1) {
        element.buttons = buttons;
    }

    let data = {
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "media",
                    elements: [
                        {
                            ...element
                        }
                    ]
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

module.exports = MediaTemplate;