class Ground {
  private _spritePath: string = "imgs/ground";
  private _spriteName: string = "ground";
  // private gameObject: GameObject;
  constructor() {
    Loader.Instance.storeImage(this._spritePath, this._spriteName);

  }

  setup() {

  }

  update() {

  }
}
