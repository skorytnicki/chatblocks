const createAPIElement = require("../createAPIElement");
const pick = require('object.pick');

const buttonTypes = {
    URL: "web_url",
    POSTBACK: "postback"
};

const allowedPropsByType = {
    [buttonTypes.URL]: ['url'], // TODO
    [buttonTypes.POSTBACK]: ['payload'],
};

function Button(props, ...children) {
    return {
        title: children[0],
        type: getType(props),
        ...getAllowedPropsByType(props)
    }
}

function getType(props) {
    return props.url ? buttonTypes.URL : buttonTypes.POSTBACK;
}

function getAllowedPropsByType(props) {
    const type = getType(props);

    switch (type) {
        case buttonTypes.URL:
            return pick(props, allowedPropsByType[buttonTypes.URL]);
        case buttonTypes.POSTBACK:
            return pick(props, allowedPropsByType[buttonTypes.POSTBACK])

    }
}

module.exports = Button;