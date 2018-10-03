"use strict";
exports.__esModule = true;
function QuickReply(props) {
    var children = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        children[_i - 1] = arguments[_i];
    }
    if (props.isLocation) {
        return {
            content_type: "location"
        };
    }
    var payload = {
        content_type: "text",
        title: children[0],
        payload: props.payload
    };
    if (props.imageUrl) {
        payload.image_url = props.image_url;
    }
    return payload;
}
exports.QuickReply = QuickReply;
