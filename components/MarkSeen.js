const createAPIElement = require("../createAPIElement");

function MarkSeen() {
    return createAPIElement({
        sender_action: "mark_seen"
    });
}

module.exports = MarkSeen;