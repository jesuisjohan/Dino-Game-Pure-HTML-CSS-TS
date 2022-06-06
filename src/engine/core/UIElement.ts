class UIElement {
  private _name: string;
  private _fontSize: number;
  private _cssText: string;
  private _textContext: string;
  private _isHidden: boolean;

  constructor(
    name: string,
    fontSize: number,
    cssText: string,
    textContext: string,
    isHidden: boolean = false
  ) {
    this._name = name;
    this._fontSize = fontSize;
    this._cssText = cssText;
    this._textContext = textContext;
    this._isHidden = isHidden;

    const queryResult = document.querySelector<HTMLElement>(`[data-${name}]`);
    if (queryResult) {
      this._elem = queryResult;
    } else {
      this._elem = this.createUI(
        name,
        fontSize,
        cssText,
        textContext,
        isHidden
      );
    }
  }

  private createUI(
    name: string,
    fontSize: number,
    cssText: string,
    textContext: string,
    isHidden: boolean = false
  ): HTMLElement {
    let elem = document.createElement("div");
    elem.dataset[name] = "true";
    elem.classList.add(name);
    if (textContext) elem.textContent = textContext;
    else elem.textContent = "";
    elem.style.setProperty("position", "absolute");
    elem.style.setProperty("font-size", `${fontSize}vmin`);
    elem.style.cssText += cssText;
    World.Instance.elem.append(elem);
    if (isHidden) {
      elem.classList.add("hide");
    }
    return this._elem;
  }

  public get element() {
    return this._elem;
  }

  public get name() {
    return this._name;
  }

  public get textContext() {
    return this._textContext;
  }

  public set textContext(text: string) {
    this._textContext = text;
    this._elem.textContent = text;
  }

  public get isHidden(): boolean {
    return this._isHidden;
  }

  public set isHidden(isHidden: boolean) {
    if (this._isHidden == isHidden) return;
    this._isHidden = isHidden;
    if (isHidden) {
      this._elem.classList.add("hide");
    } else {
      this._elem.classList.remove("hide");
    }
  }
}