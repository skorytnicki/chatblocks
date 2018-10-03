import {createAPIElement} from "../createAPIElement";
import {isQuickReply, isNotQuickReply} from "../elementTools";

// todo. Currently I assume other elements don't have type prop
const isNotButton = (obj) => !obj.type;
const isButton = (obj) => obj.type;

function ListTemplateComponent({children, sharable, topElementStyle}) {
    const quickReply = children.find(isQuickReply);
    const buttons = children.filter(isNotQuickReply).filter(isButton);
    const elements = children.filter(isNotButton).filter(isNotQuickReply); // todo ugly checks!
    let data = <MessengerData>{
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "list",
                    top_element_style: topElementStyle || "compact",
                    elements: elements,
                    buttons: buttons,
                    sharable: !!sharable
                }
            }
        }
    };

    if (quickReply) {
        data.message.quick_replies = quickReply.quickReplies;
    }

    return createAPIElement(data)
}

function Title({children}) {
    return {
        title: children[0]
    }
}

function Subtitle({children}) {
    return {
        subtitle: children[0]
    }
}

function Image({url}) {
    return {
        image_url: url
    }
}

function Element({children, defaultAction}) {
    let el = children.filter(isNotButton).reduce((previousValue, currentValue) => {
        return {
            ...previousValue,
            ...currentValue
        }
    }, {});

    if (defaultAction) {
        el.default_action = defaultAction;
    }

    const buttons = children.filter(isButton);

    if (buttons.length > 0) {
        el.buttons = buttons;
    }

    return <MessengerElement>el;
}

export const ListTemplate = {
    ListTemplate: ListTemplateComponent,
    Element,
    Title,
    Subtitle,
    Image
};