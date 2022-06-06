class SpriteRenderer {
  private _elem: HTMLImageElement;

  constructor(elem: HTMLImageElement, imgName: string, classCssStyle?: string) {
    this._elem = elem;
    let imgPath = Loader.Instance.getImage(imgName);
    if (imgPath) {
      this._elem.src = imgPath;
    }
    if (classCssStyle) {
      this.setClassCSS(classCssStyle);
    }
  }

  public setClassCSS(name: string) {
    this._elem.classList.add(name);
  }

  public changeSprite(imgName: string): boolean {
    let path = Loader.Instance.getImage(imgName);
    if (path == undefined) return false;
    this._elem.src = path;
    return true;
  }
}
