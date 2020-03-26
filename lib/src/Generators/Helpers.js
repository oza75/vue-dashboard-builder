export const capitalize = (value) => {
    value = value.trim();
    return value[0].toUpperCase() + value.slice(1);
};
export const limit = (value, limit) => {
    value = value.trim();
    return value.length > limit ? value.slice(0, limit) + '...' : value;
};
