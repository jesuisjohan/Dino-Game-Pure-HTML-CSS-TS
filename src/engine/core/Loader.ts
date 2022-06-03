/**
* @class
* @classdesc Load images and store them with new name
*/

class Loader {
  private static _instance: Loader;
  private _images: Map<string, string>;

  constructor() {
    Loader._instance = this;
    this._images = new Map<string, string>()
  }

  storeImage(path: string, newName: string) {
    this._images.set(newName, path);
  }

  getImagePath(name: string): string | undefined {
    return this._images.get(name)
  }

  public static get Instance() {
    return this._instance;
  }
}