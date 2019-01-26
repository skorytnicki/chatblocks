export interface TextProps {
    children?: any,
    quickReplies?: MessengerQuickReply[]
}

export function Text({children, quickReplies}: TextProps) {
    let data = <MessengerData>{
        message: {
            text: children.join("")
        }
    };

    if (quickReplies) {
        data.message.quick_replies = quickReplies;
    }

    return data;
}