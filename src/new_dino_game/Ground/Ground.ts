class Ground {
  private speed = 0.05
  private _spritePath: string = "imgs/ground";
  private _spriteName: string = "ground";
  private _name: string = "ground";
  private _gameObject: GameObject;
  public static count: number = 0;
  constructor() {
    Loader.Instance.storeImage(this._spritePath, this._spriteName);
    this._gameObject = new GameObject(
      this._name,
      this._spriteName,
      this.setup,
      this.update
    );
  }

  setup() {
    switch (Ground.count) {
      case 0:
        PhysicsEngine.setCustomProperty(this._gameObject.elem, "--left", 0);
        break;
      case 1:
        PhysicsEngine.setCustomProperty(this._gameObject.elem, "--left", 300);
        break;
      default:
        console.log("over 2 grounds!!");
        break;
    }
  }

  update() {
    const physic = new PhysicsEngine(this._gameObject.rigidBody)
    physic.moveHorizontal(this.speed, GameManager.speedScale)
    // ground just out of screen
    if (PhysicsEngine.getCustomProperty(this._gameObject.elem, "--left") <= -300) {
      // put it on the left
      physic.moveLeftHorizontalAt(600)
    }
  }

  public get gameObject() {
    return this._gameObject;
  }
}
