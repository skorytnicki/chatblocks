const pick = require('object.pick');

function QuickReply(props, ...children) {
    if (props.isLocation) {
        return {
            content_type: "location"
        }
    }

    let payload = {
        content_type: "text",
        title: children[0],
        payload: props.payload
    };

    if (props.imageUrl) {
        payload.image_url = props.image_url
    }

    return payload
}

module.exports = QuickReply;