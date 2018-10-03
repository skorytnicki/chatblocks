import elementTypes from './elementTypes';

export const isQuickReply = (c) => c.type === elementTypes.QUICK_REPLY;
export const isNotQuickReply = (c) => c.type !== elementTypes.QUICK_REPLY;
export const isAPICall = (c) => c.type === elementTypes.API;