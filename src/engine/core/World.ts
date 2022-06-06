/**
 * @class
 * @classdesc world is where every other game object inside
 */
class World {
  private static _instance: World;
  private _worldElem: HTMLElement;
  private _width: number;
  private _height: number;

  public static get Instance() {
    if (World._instance == null) {
      World._instance = new World();
    }
    return this._instance;
  }

  constructor(width: number = 100, height: number = 30) {
    this._width = width;
    this._height = height;
    this.createWorld();
    this._worldElem = document.querySelector<HTMLElement>("[data-world]")!;
    this.setPixelToWorldScale();
    window.addEventListener("resize", this.setPixelToWorldScale);
  }

  private setPixelToWorldScale() {
    let worldToPixelScale: number;
    if (window.innerWidth / window.innerHeight < this._width / this._height) {
      worldToPixelScale = window.innerWidth / this._width;
    } else {
      worldToPixelScale = window.innerHeight / this._height;
    }
    this._worldElem.style.width = `${this._width * worldToPixelScale}px`;
    this._worldElem.style.height = `${this._height * worldToPixelScale}px`;
  }

  public get elem(): HTMLElement {
    return this._worldElem;
  }

  private createWorld() {
    if (this._worldElem) return;
    this.createWorldHTML();
    this.createWorldCSS();
  }

  private createWorldHTML() {
    this._worldElem = document.createElement("div");
    this._worldElem.dataset.world = "true";
    this._worldElem.classList.add("world");
    document.body.append(this._worldElem);
  }

  private createWorldCSS() {
    this._worldElem.style.setProperty("overflow", "hidden");
    this._worldElem.style.setProperty("position", "relative");
  }
}
