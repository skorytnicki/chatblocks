const createAPIElement = require("../createAPIElement");
const elementTools = require("../elementTools");
const {isQuickReply, isNotQuickReply} = elementTools;

function GenericTemplate(props, ...children) {
    const elements = children.filter(isNotQuickReply);
    let data = {
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "generic",
                    elements: elements,
                    image_aspect_ratio: props.imageAspectRatio === "square" ? "square" : "horizontal",
                    sharable: !!props.sharable
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

// todo
const isNotButton = (obj) => !obj.type;
const isButton = (obj) => obj.type;

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
    GenericTemplate, Element, Title, Subtitle, Image
};