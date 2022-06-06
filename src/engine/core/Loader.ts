/**
 * @class
 * @classdesc Load images and store them with new name
 */

class Loader {
  private static _instance: Loader;
  private _images: Map<string, HTMLImageElement>;

  public static get Instance() {
    if (Loader._instance == null) Loader._instance = new Loader();
    return this._instance;
  }

  constructor() {
    this._images = new Map<string, HTMLImageElement>();
  }

  storeImage(path: string, newName: string) {
    const image = new Image();
    image.src = path;
    this._images.set(newName, image);
  }

  getImage(name: string): HTMLImageElement | undefined {
    return this._images.get(name);
  }
}
