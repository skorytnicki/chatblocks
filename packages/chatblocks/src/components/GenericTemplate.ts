export enum imageAspectRatio {
    square = "square",
    horizontal = "horizontal"
}

export interface GenericTemplateProps {
    children?: any,
    sharable?: boolean,
    imageAspectRatio?: imageAspectRatio,
    quickReplies?: MessengerQuickReply[]
}

function GenericTemplateElement({children, sharable, imageAspectRatio, quickReplies}: GenericTemplateProps) {
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

// todo-buttons
const isNotButton = (obj) => !obj.type;
const isButton = (obj) => obj.type;

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

export const GenericTemplate = {
    GenericTemplate: GenericTemplateElement,
    Element,
    Title,
    Subtitle,
    Image
};