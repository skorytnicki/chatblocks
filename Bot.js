const createAPICall = require('./createAPICall');
const elementTools = require("./elementTools");
const pick = require("object.pick");
const {isAPICall} = elementTools;

class Bot {
    constructor({component, pageAccessToken, facebookAPIVersion}) {
        this.component = new component();
        this.pageAccessToken = pageAccessToken;
        this.facebookAPIVersion = facebookAPIVersion;

    }

    toAPICalls(senderId, reply) {
        return flatten(reply)
            .filter(component => isAPICall(component))
            .map((component) => {
                const params = pick(component, ["message", "sender_action"]);
                return createAPICall(params, this.pageAccessToken, this.facebookAPIVersion, senderId);
            });
    }

    async send(senderId, reply) {
        let funcs = this.toAPICalls(senderId, reply);

        for (const func of funcs) {
            await func();
        }
    }

    async trigger({senderId, event}) {
        const reply = await this.component.render(event);
        const formattedReply = toArray(reply);
        this.send(senderId, formattedReply);
    }
}

function flatten(arr) {
    return arr.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), [])
}

function toArray(obj) {
    if (!Array.isArray(obj)) {
        return [obj]
    }
    return obj;
}

module.exports = Bot;