import {createAPIElement} from "../createAPIElement";
import {isQuickReply, isNotQuickReply} from "../elementTools";

export function ButtonTemplate({children, text, sharable}) {
    const buttons = children.filter(isNotQuickReply);
    let data = <MessengerData>{
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text: text,
                    buttons: buttons,
                    sharable: !!sharable
                }
            }
        }
    };
    const quickReply = children.find(isQuickReply);

    if (quickReply) {
        data.message.quick_replies = quickReply.quickReplies;
    }

    return createAPIElement(data);
}
