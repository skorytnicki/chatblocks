const elementTools = require("./elementTools");
const {isAPICall} = elementTools;
const defaultMiddleware = require('./defaultMiddleware');

class Bot {
    constructor({component, pageAccessToken, facebookAPIVersion, middleware}) {
        this.component = new component();
        this.pageAccessToken = pageAccessToken;
        this.facebookAPIVersion = facebookAPIVersion;
        this.middleware = middleware ? middleware : defaultMiddleware;
    }

    getMessages(reply) {
        return flatten(reply).filter(component => isAPICall(component))
    }

    async send(senderId, reply) {
        let messages = this.getMessages(reply);
        this.middleware(messages, this.pageAccessToken, this.facebookAPIVersion, senderId)
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