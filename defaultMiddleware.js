// this could be another package to remove most of all dependencies
const createAPICall = require('./createAPICall');
const pick = require("object.pick");

async function defaultMiddleware(messages, pageAccessToken, facebookAPIVersion, senderId) {
    const funcs = messages.map((component) => {
        const params = pick(component, ["message", "sender_action"]);
        return createAPICall(params, pageAccessToken, facebookAPIVersion, senderId);
    });

    for (const func of funcs) {
        await func();
    }
}

module.exports = defaultMiddleware;