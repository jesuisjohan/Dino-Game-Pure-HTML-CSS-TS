/**
 * @class
 * @classdesc Load images and store them with new name
 */

class Loader {
  private static _instance: Loader;
  private _images: Map<string, string>;

  public static get Instance() {
    if (Loader._instance == null) Loader._instance = new Loader();
    return this._instance;
  }

  constructor() {
    this._images = new Map<string, string>();
  }

  storeImage(path: string, newName: string) {
    this._images.set(newName, path);
  }

  getImagePath(name: string): string | undefined {
    return this._images.get(name);
  }
}
