const hasValue = (arr: any) => {
    return arr && arr.length > 0
}
const isEmpty = (arr: any[]) => {
    return !arr || arr.length <= 0;

}

const ArrayUtils = {
    hasValue,
    isEmpty
}

export default ArrayUtils;