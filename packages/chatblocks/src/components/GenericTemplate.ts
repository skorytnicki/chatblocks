function GenericTemplateElement({children, sharable, imageAspectRatio, quickReplies}) {
    let data = <MessengerData>{
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "generic",
                    elements: children,
                    image_aspect_ratio: imageAspectRatio === "square" ? "square" : "horizontal",
                    sharable: !!sharable
                }
            }
        }
    };

    if (quickReplies) {
        data.message.quick_replies = quickReplies;
    }

    return data;
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

// todo-buttons
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