export function MediaTemplate({children, attachmentId, url, mediaType, quickReplies}) {
    let element = <MessengerElement>{
        media_type: mediaType
    };

    if (attachmentId) {
        element.attachment_id = attachmentId;
    }

    if (url) {
        element.url = url;
    }

    if (children.length === 1) {
        element.buttons = children;
    }

    let data = <MessengerData>{
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "media",
                    elements: [
                        element
                    ]
                }
            }
        }
    };

    if (quickReplies) {
        data.message.quick_replies = quickReplies;
    }

    return data;
}