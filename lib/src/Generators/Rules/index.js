export const required = function (value, params, el) {
    return !!value;
};
export const min = function (value, params, element) {
    let parsed = parseFloat(value);
    if (isNaN(parsed)) {
        return value.length >= params;
    }
    return parsed >= params;
};
export const max = function (value, params, element) {
    let parsed = parseFloat(value);
    if (isNaN(parsed)) {
        return value.length <= params;
    }
    return parsed <= params;
};
const rules = { required, min, max };
export default rules;
