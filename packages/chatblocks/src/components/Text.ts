import {createAPIElement} from "../createAPIElement";
import {isQuickReply, isNotQuickReply} from "../elementTools";

export function Text({children}) {
    const text = children.filter(isNotQuickReply);

    let data = <MessengerData>{
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