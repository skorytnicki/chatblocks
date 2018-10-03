"use strict";
exports.__esModule = true;
var elementTypes_1 = require("../elementTypes");
function QuickReplies(props) {
    var children = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        children[_i - 1] = arguments[_i];
    }
    return {
        type: elementTypes_1["default"].QUICK_REPLY,
        quickReplies: children
    };
}
exports.QuickReplies = QuickReplies;
