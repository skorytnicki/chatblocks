const pick = require('object.pick');

function QuickReply(props, ...children) {
    if (props.isLocation) {
        return {
            content_type: "location"
        }
    }
    return {
        content_type: "text",
        title: children[0],
        payload: props.payload // todo
    }
}

module.exports = QuickReply;