const createAPIElement = require("../createAPIElement");
const elementTools = require("../elementTools");
const {isQuickReply, isNotQuickReply} = elementTools;

// todo. Currently I assume other elements don't have type prop
const isNotButton = (obj) => !obj.type;
const isButton = (obj) => obj.type;

function ListTemplate(props, ...children) {
    const quickReply = children.find(isQuickReply);
    const buttons = children.filter(isNotQuickReply).filter(isButton);
    const elements = children.filter(isNotButton).filter(isNotQuickReply); // todo ugly checks!
    let data = {
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "list",
                    top_element_style: props && props.topElementStyle ? props.topElementStyle : "compact",
                    elements: elements,
                    buttons: buttons,
                    sharable: props ? !!props.sharable : false
                }
            }
        }
    };

    if (quickReply) {
        data.message.quick_replies = quickReply.quickReplies;
    }

    return createAPIElement(data)
}

function Title(props, ...children) {
    return {
        title: children[0]
    }
}

function Subtitle(props, ...children) {
    return {
        subtitle: children[0]
    }
}

function Image(props, ...children) {
    return {
        image_url: props.url
    }
}

function Element(props, ...children) {
    let el = children.filter(isNotButton).reduce((previousValue, currentValue) => {
        return {
            ...previousValue,
            ...currentValue
        }
    }, {});

    if (props && props.defaultAction) {
        el.default_action = props.defaultAction;
    }

    const buttons = children.filter(isButton);

    if (buttons.length > 0) {
        el.buttons = buttons;
    }

    return el;
}

module.exports = {
    ListTemplate, Element, Title, Subtitle, Image
};