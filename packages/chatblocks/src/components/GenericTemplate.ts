import {createAPIElement} from "../createAPIElement";
import {isQuickReply, isNotQuickReply} from "../elementTools";

function GenericTemplateElement({children, sharable, imageAspectRatio}) {
    const elements = children.filter(isNotQuickReply);
    let data = <MessengerData>{
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "generic",
                    elements: elements,
                    image_aspect_ratio: imageAspectRatio === "square" ? "square" : "horizontal",
                    sharable: !!sharable
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

// todo. Currently I assume other elements don't have type prop
const isNotButton = (obj) => !obj.type;
const isButton = (obj) => obj.type;

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

    return el;
}

export const GenericTemplate = {
    GenericTemplate: GenericTemplateElement,
    Element,
    Title,
    Subtitle,
    Image
};