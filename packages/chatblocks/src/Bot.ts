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

    async send(senderId, reply) {
        this.middleware({
            messages: flatten([reply]),
            pageAccessToken: this.pageAccessToken,
            facebookAPIVersion: this.facebookAPIVersion,
            senderId: senderId
        });
    }

    async render({senderId, event}) {
        const reply = await this.component(event);
        return this.send(senderId, reply);
    }
}

function flatten(arr) {
    return arr.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), [])
}