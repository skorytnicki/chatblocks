import {createAPIElement} from "../createAPIElement";

export function TypingOn() {
    return createAPIElement({
        sender_action: "typing_on"
    });
}