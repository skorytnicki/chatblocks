const basicComponentsList = require('./componentsList');
const Block = require('./components/Block');

// todo inspect this; harmonize this API
async function createElement(component, props, ...children) {
    if (basicComponentsList.includes(component.name)) {
        return component(props, ...children)
    }

    const Component = new component(props);
    const result = await Component.render();

    if (!Array.isArray(result)) { // component returned single element
        return result;
    }

    // It is Block or array of elements (.map(async (el) => <Text>Hey {el}</Text>))
    // todo: testing!
    const components = [];
    for (let func of result) {
        components.push(await func);
    }
    return components;

}

module.exports = createElement;