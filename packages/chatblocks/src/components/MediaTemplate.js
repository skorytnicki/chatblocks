"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var createAPIElement_1 = require("../createAPIElement");
var elementTools_1 = require("../elementTools");
function MediaTemplate(props) {
    var children = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        children[_i - 1] = arguments[_i];
    }
    var buttons = children.filter(elementTools_1.isNotQuickReply);
    var element = {
        media_type: props.mediaType
    };
    if (props.attachmentId) {
        element.attachment_id = props.attachmentId;
    }
    if (props.url) {
        element.url = props.url;
    }
    if (buttons.length === 1) {
        element.buttons = buttons;
    }
    var data = {
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "media",
                    elements: [
                        __assign({}, element)
                    ]
                }
            }
        }
    };
    var quickReply = children.find(elementTools_1.isQuickReply);
    if (quickReply) {
        data.message.quick_replies = quickReply.quickReplies;
    }
    return createAPIElement_1.createAPIElement(data);
}
exports.MediaTemplate = MediaTemplate;
