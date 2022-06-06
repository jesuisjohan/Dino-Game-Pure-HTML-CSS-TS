/**
 * @class
 * @classdesc world is where every other game object inside
 */
class World {
  private static _instance: World;
  private _width: number;
  private _height: number;
  private _canvas: HTMLCanvasElement;

  public static get Instance() {
    if (World._instance == null) {
      World._instance = new World();
    }
    return this._instance;
  }

  constructor(width: number = 100, height: number = 30) {
    this._width = width;
    this._height = height;

    this._canvas = document.querySelector('canvas')!;
    const c = this._canvas.getContext('2d');

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
    this._canvas.width = this._width * worldToPixelScale;
    this._canvas.height = this._height * worldToPixelScale
  }
}
