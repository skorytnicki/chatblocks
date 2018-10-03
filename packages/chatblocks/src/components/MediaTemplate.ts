import {createAPIElement} from "../createAPIElement";
import {isQuickReply, isNotQuickReply} from "../elementTools";

export function MediaTemplate({children, attachmentId, url, mediaType}) {
    const buttons = children.filter(isNotQuickReply);
    let element = <MessengerElement>{
        media_type: mediaType
    };

    if (attachmentId) {
        element.attachment_id = attachmentId;
    }

    if (url) {
        element.url = url;
    }

    if (buttons.length === 1) {
        element.buttons = buttons;
    }

    let data = <MessengerData>{
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