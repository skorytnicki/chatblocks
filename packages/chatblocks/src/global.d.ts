declare type MessengerData = {
    message?: MessengerDataObject
    sender_action?: "mark_seen" | "typing_on" | "typing_off"
}

declare type MessengerDataObject = {
    attachment?: MessengerAttachment;
    quick_replies?: MessengerQuickReply[];
}

declare type MessengerAttachment = {
    type: string;
    payload: MessengerAttachmentPayload;
}

declare type MessengerAttachmentPayload = {
    template_type: string;
    text?: string;
    buttons?: MessengerButton[];
    sharable?: boolean;
    image_aspect_ratio?: "square" | "horizontal",
    top_element_style?: "compact" | "large",
    elements: MessengerElement[]
}

declare type MessengerQuickReply = {
    content_type: "text" | "location";
    text?: string;
    payload?: string;
    image_url?: string
}

declare type MessengerButton = {
    title: string;
    payload: string;
    url: string;
    fallback_url: string;
    share_contents: object;
    payment_summary: object;
    price_list: object;
    game_metadata: object;
    messenger_extensions: object;
    webview_height_ratio: "compact" | "tall" | "full";
}

declare type MessengerElement = {
    media_type?: "video" | "image",
    attachment_id?: string;
    url?: string;
    buttons?: MessengerButton[],

    title?: string;
    subtitle?: string;
    image_url?: string;
    default_action: string;
}

declare type Component<T> = {
    (args: T)
}

declare type ButtonTemplateProps = {
    text: string;
    children: any[];
    sharable?: boolean
}
