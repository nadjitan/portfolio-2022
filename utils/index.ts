/**
 * Remove or add item in an array
 */
export const addOrRemove = <T>(arr: T[], item: T) =>
  arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item]
