const elementTypes = require('./elementTypes');
function createAPIElement(payload) {
    return {
        type: elementTypes.API,
        ...payload
    }
}

module.exports = createAPIElement;