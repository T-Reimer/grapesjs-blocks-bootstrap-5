/**
 * Checks if a element has a class name
 *
 * @param el
 * @param toFind
 * @returns
 */
const elHasClass = (el: HTMLElement, toFind: string) => {
  let cls = el.className;
  cls = cls && cls.toString();
  if (cls && cls.split(" ").indexOf(toFind) >= 0) return 1;
};

/**
 * Capitalize the first letter of each word in a phrase
 *
 * @param phrase
 * @returns
 */
const capitalize = (phrase: string) => {
  return phrase
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export { elHasClass, capitalize };
