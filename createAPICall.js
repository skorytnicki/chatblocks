const rp = require('request-promise');

function createAPICall(payload, pageAccessToken, facebookAPIVersion, recipientId) {
    return function() {
        return rp({
            method: "POST",
            uri: `https://graph.facebook.com/${facebookAPIVersion}/me/messages?access_token=${pageAccessToken}`,
            json: {
                messaging_type: "RESPONSE", // TODO
                recipient: {
                    id: recipientId
                },
                ...payload
            }
        });
    }
}

module.exports = createAPICall;