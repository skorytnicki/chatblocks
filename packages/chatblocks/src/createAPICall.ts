import * as rp from "request-promise";

export function createAPICall(payload, pageAccessToken, facebookAPIVersion, recipientId, messagingType = "RESPONSE") {
    return function() {
        return rp({
            method: "POST",
            uri: `https://graph.facebook.com/${facebookAPIVersion}/me/messages?access_token=${pageAccessToken}`,
            json: {
                messaging_type: messagingType,
                recipient: {
                    id: recipientId
                },
                ...payload
            }
        });
    }
}