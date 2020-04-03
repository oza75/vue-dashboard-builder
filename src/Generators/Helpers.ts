export const capitalize = (value: string): string => {
  value = value.trim();
  return value[0].toUpperCase() + value.slice(1);
};

export const limit = (value: string, limit: number): string => {
  value = value.trim();
  return value.length > limit ? value.slice(0, limit) + '...' : value;
};
