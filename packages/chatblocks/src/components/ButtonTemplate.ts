export interface ButtonTemplateProps {
    text: string;
    children?: any;
    sharable?: boolean,
    quickReplies?: MessengerQuickReply[]
}

export function ButtonTemplate({children, text, sharable, quickReplies}: ButtonTemplateProps) {
    let data = <MessengerData>{
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text: text,
                    buttons: children,
                    sharable: sharable
                }
            }
        }
    };

    if (quickReplies) {
        data.message.quick_replies = quickReplies;
    }

    return data;
}
