const createAPIElement = require("../createAPIElement");

function TypingOn() {
    return createAPIElement({
        sender_action: "typing_on"
    });
}

module.exports = TypingOn;