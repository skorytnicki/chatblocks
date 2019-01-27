export async function createElement(component, props, ...children) {
    const result = await component({...props, children});

    if (Array.isArray(result)) {
        const components = [];
        for (let func of result) {
            components.push(await func);
        }
        return components;
    }

    return result;
}