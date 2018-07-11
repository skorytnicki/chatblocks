const basicComponentsList = require('./componentsList');
const Block = require('./components/Block');

async function createElement(component, props, ...children) {
    if(basicComponentsList.includes(component.name)) {
        return component(props, ...children)
    }

    const Component = new component(props);
    const result = await Component.render();
    return await createElement(Block, {}, [result]);
}

module.exports = createElement;