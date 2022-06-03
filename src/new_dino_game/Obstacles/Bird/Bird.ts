class Bird {
  private SPEED = 0.07;
  private BIRD_INTERVAL_MIN = 500 * 2;
  private BIRD_INTERVAL_MAX = 2000 * 2;
  private BIRD_FRAME_TIME = 400;

  private _spritePath: string = "imgs/Bird";
  private _spriteName: string = "Bird"; // default sprite
  private _name: string = "bird";
  private _gameObject: GameObject;

  constructor() {
    Loader.Instance.storeImage(this._spritePath, this._spriteName);
    Loader.Instance.storeImage("imgs/Bird0", "bird0");
    Loader.Instance.storeImage("imgs/Bird1", "bird1");
    this._gameObject = new GameObject(
      this._name,
      this._spriteName,
      this.setup,
      this.update
    );

    this._gameObject.animation = new Animator(
      this._gameObject.elem,
      this.BIRD_FRAME_TIME,
      GameManager.speedScale,
      ["bird0", "bird1"]
    );
  }

  setup() {}

  update() {}
}
