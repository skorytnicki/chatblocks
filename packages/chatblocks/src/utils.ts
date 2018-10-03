export function pick(haystack: object, needle: string[]): object {
    return needle.reduce((previousValue, currentValue) => {
        return {
            ...previousValue,
            [currentValue]: haystack[currentValue]
        }
    }, {})
}