class SpriteRenderer {
  private _elem: HTMLImageElement;

  constructor(elem: HTMLImageElement, imgName: string, classCssStyle?: string) {
    this._elem = elem;
    const img = Loader.Instance.getImage(imgName);
    if (img) this._elem = img;
    if (classCssStyle) this.setClassCSS(classCssStyle);
  }

  public setClassCSS(name: string) {
    this._elem.classList.add(name);
  }

  public changeSprite(imgName: string): boolean {
    const img = Loader.Instance.getImage(imgName);
    if (img == undefined) return false;
    this._elem = img;
    return true;
  }
}
