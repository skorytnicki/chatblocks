// todo-buttons
const isNotButton = (obj) => !obj.type;
const isButton = (obj) => obj.type;

export interface ListTemplateProps {
    children?: any
    sharable?: boolean,
    topElementStyle?: string
    quickReplies?: MessengerQuickReply[]
}

function ListTemplateComponent({children, sharable, topElementStyle, quickReplies}: ListTemplateProps) {
    const buttons = children.filter(isButton);
    const elements = children.filter(isNotButton); // todo-buttons
    let data = <MessengerData>{
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "list",
                    top_element_style: topElementStyle || "compact",
                    elements: elements,
                    buttons: buttons,
                    sharable: Boolean(sharable)
                }
            }
        }
    };

    if (quickReplies) {
        data.message.quick_replies = quickReplies;
    }

    return data
}

export interface TitleProps {
    children?: any
}

function Title({children}: TitleProps) {
    return {
        title: children[0]
    }
}

export interface SubtitleProps {
    children?: any
}

function Subtitle({children}: SubtitleProps) {
    return {
        subtitle: children[0]
    }
}

export interface ImageProps {
    url: string
}

function Image({url}: ImageProps) {
    return {
        image_url: url
    }
}

export interface ElementProps {
    children?: any
    defaultAction: string
}

function Element({children, defaultAction}: ElementProps) {
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

export const ListTemplate = {
    ListTemplate: ListTemplateComponent,
    Element,
    Title,
    Subtitle,
    Image
};