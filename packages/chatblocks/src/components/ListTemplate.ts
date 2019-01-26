// todo-buttons
const isNotButton = (obj) => !obj.type;
const isButton = (obj) => obj.type;

function ListTemplateComponent({children, sharable, topElementStyle, quickReplies}) {
    const buttons = children.filter(isButton);
    const elements = children.filter(isNotButton); // todo ugly checks!
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

    if (quickReplies) {
        data.message.quick_replies = quickReplies;
    }

    return data
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