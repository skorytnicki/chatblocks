import {isAPICall} from "./elementTools";
import {defaultMiddleware} from "./defaultMiddleware";

export class Bot {
    component: any;
    pageAccessToken: string;
    facebookAPIVersion: string;
    middleware: any;

    constructor({component, pageAccessToken, facebookAPIVersion, middleware}) {
        this.component = component;
        this.pageAccessToken = pageAccessToken;
        this.facebookAPIVersion = facebookAPIVersion;
        this.middleware = middleware || defaultMiddleware;
    }

    getMessages(reply) {
        return flatten([reply])
            .filter(component => isAPICall(component))
            .map(({type, ...el}) => el)
    }

    async send(senderId, reply) {
        let messages = this.getMessages(reply);
        this.middleware({
            messages: messages,
            pageAccessToken: this.pageAccessToken,
            facebookAPIVersion: this.facebookAPIVersion,
            senderId: senderId
        });
    }

    async trigger({senderId, event}) {
        const reply = await this.component(event);
        this.send(senderId, reply);
    }
}

function flatten(arr) {
    return arr.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), [])
}