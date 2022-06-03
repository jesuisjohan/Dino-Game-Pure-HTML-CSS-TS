export function getCustomProperty(elem: HTMLImageElement, prop: string) {
  return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0;
}

export function setCustomProperty(
  elem: HTMLImageElement,
  prop: string,
  value: number | string
) {
  if (typeof value === "number") {
    elem.style.setProperty(prop, value.toString());
  } else {
    elem.style.setProperty(prop, value);
  }
}

export function incrementCustomProperty(
  elem: HTMLImageElement,
  prop: string,
  inc: number
) {
  setCustomProperty(elem, prop, getCustomProperty(elem, prop) + inc);
}
