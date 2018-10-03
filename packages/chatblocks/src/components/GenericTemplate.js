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
function GenericTemplate(props) {
    var children = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        children[_i - 1] = arguments[_i];
    }
    var elements = children.filter(elementTools_1.isNotQuickReply);
    var data = {
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "generic",
                    elements: elements,
                    image_aspect_ratio: props && props.imageAspectRatio === "square" ? "square" : "horizontal",
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
exports.GenericTemplate = GenericTemplate;
function Title(props) {
    var children = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        children[_i - 1] = arguments[_i];
    }
    return {
        title: children[0]
    };
}
exports.Title = Title;
function Subtitle(props) {
    var children = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        children[_i - 1] = arguments[_i];
    }
    return {
        subtitle: children[0]
    };
}
exports.Subtitle = Subtitle;
function Image(props) {
    var children = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        children[_i - 1] = arguments[_i];
    }
    return {
        image_url: props.url
    };
}
exports.Image = Image;
// todo. Currently I assume other elements don't have type prop
var isNotButton = function (obj) { return !obj.type; };
var isButton = function (obj) { return obj.type; };
function Element(props) {
    var children = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        children[_i - 1] = arguments[_i];
    }
    var el = children.filter(isNotButton).reduce(function (previousValue, currentValue) {
        return __assign({}, previousValue, currentValue);
    }, {});
    if (props && props.defaultAction) {
        el.default_action = props.defaultAction;
    }
    var buttons = children.filter(isButton);
    if (buttons.length > 0) {
        el.buttons = buttons;
    }
    return el;
}
exports.Element = Element;
