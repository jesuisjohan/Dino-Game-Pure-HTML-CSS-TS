/**
 * @class
 * @classdesc world is where every other game object inside
 */
class World {
  private static _instance: World;
  private _width: number;
  private _height: number;
  private _canvas: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;

  public static get Instance() {
    if (World._instance == null) {
      World._instance = new World();
    }
    return this._instance;
  }

  constructor(width: number = 100, height: number = 30) {
    this._width = width;
    this._height = height;

    const canvasQuery = document.querySelector<HTMLCanvasElement>("canvas");
    if (canvasQuery != null) {
      this._canvas = canvasQuery;
    } else {
      this._canvas = document.createElement("canvas");
      document.body.appendChild(this._canvas);
    }
    this._context = this._canvas.getContext("2d")!;

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
    this._canvas.height = this._height * worldToPixelScale;
  }

  public get context() {
    return this._context
  }

  public clear() {
    this._context.clearRect(0, 0, this._width, this._height);
  }
}
