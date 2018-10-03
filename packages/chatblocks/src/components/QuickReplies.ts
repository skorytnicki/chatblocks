import elementTypes from '../elementTypes';
export function QuickReplies({children}) {
    return {
        type: elementTypes.QUICK_REPLY,
        quickReplies: <MessengerQuickReply[]>children
    };
}