"use strict";
exports.__esModule = true;
var createAPIElement_1 = require("../createAPIElement");
var elementTools_1 = require("../elementTools");
function ButtonTemplate(props) {
    var children = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        children[_i - 1] = arguments[_i];
    }
    var buttons = children.filter(elementTools_1.isNotQuickReply);
    var data = {
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text: props.text,
                    buttons: buttons,
                    sharable: props ? !!props.sharable : false
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
exports.ButtonTemplate = ButtonTemplate;
