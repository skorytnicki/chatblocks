"use strict";
exports.__esModule = true;
var elementTypes_1 = require("./elementTypes");
exports.isQuickReply = function (c) { return c.type === elementTypes_1["default"].QUICK_REPLY; }; // todo inconsistent
exports.isNotQuickReply = function (c) {
    if (typeof c !== 'object') {
        return true;
    }
    return c.type !== elementTypes_1["default"].QUICK_REPLY;
};
exports.isAPICall = function (c) {
    return c.type === elementTypes_1["default"].API;
};
