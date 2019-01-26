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