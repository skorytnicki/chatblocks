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
var object_pick_1 = require("object.pick");
var types = {
    URL: "web_url",
    POSTBACK: "postback",
    SHARE: "element_share",
    PAYMENT: "payment",
    PHONENUMBER: "phone_number",
    GAMEPLAY: "game_play",
    ACCOUNTLINK: "account_link",
    ACCOUNTUNLINK: "account_unlink"
};
var props = [
    {
        chatblocksName: "title",
        messengerName: "title",
        types: [types.POSTBACK, types.PAYMENT, types.GAMEPLAY, types.PHONENUMBER, types.URL]
    },
    {
        chatblocksName: "payload",
        messengerName: "payload",
        types: [types.POSTBACK, types.PAYMENT, types.GAMEPLAY, types.PHONENUMBER]
    },
    {
        chatblocksName: "url",
        messengerName: "url",
        types: [types.URL, types.ACCOUNTLINK]
    },
    {
        chatblocksName: "shareContents",
        messengerName: "share_contents",
        types: [types.SHARE]
    },
    {
        chatblocksName: "paymentSummary",
        messengerName: "payment_summary",
        types: [types.PAYMENT]
    },
    {
        chatblocksName: "priceList",
        messengerName: "price_list",
        types: [types.PAYMENT]
    },
    {
        chatblocksName: "gameMetadata",
        messengerName: "game_metadata",
        types: [types.GAMEPLAY]
    },
    {
        chatblocksName: "messengerExtensions",
        messengerName: "messenger_extensions",
        types: [types.URL]
    },
    {
        chatblocksName: "webviewHeightRatio",
        messengerName: "webview_height_ratio",
        types: [types.URL]
    },
    {
        chatblocksName: "fallbackURL",
        messengerName: "fallback_url",
        types: [types.URL]
    },
];
function Button(props) {
    var children = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        children[_i - 1] = arguments[_i];
    }
    var type = props.type ? props.type : guessType(props);
    props.title = children.length > 0 ? children[0] : "";
    return __assign({ type: type }, getParams(type, props));
}
exports.Button = Button;
function guessType(props) {
    if (props.type) {
        return props.type;
    }
    return props.url ? types.URL : types.POSTBACK;
}
function getMessengerParamByProp(prop) {
    return props.find(function (el) { return el.chatblocksName === prop; }).messengerName;
}
function getParams(type, passedProps) {
    var allowedPropsByType = props.filter(function (prop) {
        return prop.types.includes(type);
    }).map(function (prop) { return prop.chatblocksName; });
    var allowedProps = object_pick_1["default"](passedProps, allowedPropsByType);
    var allowedPropsToMessengerParams = Object.keys(allowedProps).reduce(function (previousValue, currentValue) {
        var _a;
        return __assign({}, previousValue, (_a = {}, _a[getMessengerParamByProp(currentValue)] = allowedProps[currentValue], _a));
    }, {});
    return allowedPropsToMessengerParams;
}
