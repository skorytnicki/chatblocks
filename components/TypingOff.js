const createAPIElement = require("../createAPIElement");

function TypingOff() {
    return createAPIElement({
        sender_action: "typing_off"
    });
}

module.exports = TypingOff;