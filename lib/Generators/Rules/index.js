// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const required = function (value, params, el) {
    return !!value;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const min = function (value, params, element) {
    const parsed = parseFloat(value);
    if (isNaN(parsed)) {
        return value.length >= params;
    }
    return parsed >= params;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const max = function (value, params, element) {
    const parsed = parseFloat(value);
    if (isNaN(parsed)) {
        return value.length <= params;
    }
    return parsed <= params;
};
const rules = { required, min, max };
export default rules;
