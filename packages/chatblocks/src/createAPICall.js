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
var request_promise_1 = require("request-promise");
function createAPICall(payload, pageAccessToken, facebookAPIVersion, recipientId) {
    return function () {
        return request_promise_1["default"]({
            method: "POST",
            uri: "https://graph.facebook.com/" + facebookAPIVersion + "/me/messages?access_token=" + pageAccessToken,
            json: __assign({ messaging_type: "RESPONSE", recipient: {
                    id: recipientId
                } }, payload)
        });
    };
}
exports.createAPICall = createAPICall;
