export interface QuickReplyProps {
    children?: any
    isLocation?: boolean
    imageUrl?: string,
    payload?: string
}

export function QuickReply({children, isLocation, imageUrl, payload}: QuickReplyProps) {
    if (isLocation) {
        return <MessengerQuickReply>{
            content_type: "location"
        }
    }

    let buttonPayload = <MessengerQuickReply>{
        content_type: "text",
        title: children[0],
        payload: payload
    };

    if (imageUrl) {
        buttonPayload.image_url = imageUrl
    }

    return buttonPayload;
}