class Engine {
  private static _instance: Engine;
  private _lastTime: number | null;
  private _delta: number;
  private _script: Script;
  private _gameObjects: GameObject[] = [];

  public static get Instance() {
    if (!Engine._instance) Engine._instance = new Engine();
    return Engine._instance;
  }

  /**
   *
   * @param script Script to manage game
   * @param anyKeyToStart automatically start game
   */
  constructor(script: Script = new Script(), anyKeyToStart: boolean = true) {
    Engine._instance = this;
    this._lastTime = null;
    this._delta = 0;
    this._script = script;
    if (anyKeyToStart) this.pressAnyKeyToStart();
  }

  pressAnyKeyToStart() {
    document.addEventListener(EventTypeEnum.KeyDown, this.start, {
      once: true,
    });
  }

  start() {
    this._script.start();
    this._gameObjects.forEach((gameObject) => gameObject.start());
    window.requestAnimationFrame(this.update);
  }

  update(time: number) {
    if (this._lastTime == null) {
      this._lastTime = time;
      window.requestAnimationFrame(this.update);
      return;
    }

    this._delta = time - this._lastTime;
    // for each scene, update their game object
    // this._scenes.forEach(s => s.update())
    this._gameObjects.forEach((gameObject) => gameObject.update());
    this._script.update();
    this._lastTime = time;
    window.requestAnimationFrame(this.update);
  }

  public get delta() {
    return this._delta;
  }

  addGameObject(gameObject: GameObject) {
    this._gameObjects.push(gameObject);
  }
}
