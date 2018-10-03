import {createAPIElement} from "../createAPIElement";

export function MarkSeen() {
    return createAPIElement({
        sender_action: "mark_seen"
    });
}