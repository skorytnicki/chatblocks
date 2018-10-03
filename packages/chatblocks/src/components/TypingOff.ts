import {createAPIElement} from "../createAPIElement";

export function TypingOff() {
    return createAPIElement({
        sender_action: "typing_off"
    });
}