import elementTypes from "./elementTypes";
export function createAPIElement(payload: MessengerData) {
    return {
        type: elementTypes.API,
        ...payload
    }
}