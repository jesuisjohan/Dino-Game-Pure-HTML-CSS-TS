class Engine {
  private static _instance: Engine;
  private _lastTime: number | null;
  private _delta: number;
  private _logicInStart: Function;
  private _logicInUpdate: Function;

  private _gameObjects: GameObject[] = [];

  public static get Instance() {
    if (!Engine._instance) Engine._instance = new Engine();
    return this._instance;
  }
  /**
   *
   * @param logicInStart Set score, speedScale etc.
   * @param logicInUpdate Check lose
   * @param anyKeyToStart Automatically start or manually start game
   */
  constructor(
    logicInStart: Function = new Function(),
    logicInUpdate: Function = new Function(),
    anyKeyToStart: boolean = true
  ) {
    Engine._instance = this;
    this._lastTime = null;
    this._delta = 0;
    this._logicInStart = logicInStart;
    this._logicInUpdate = logicInUpdate;
    if (anyKeyToStart) this.pressAnyKeyToStart();
  }

  pressAnyKeyToStart() {
    document.addEventListener(EventTypeEnum.KeyDown, this.start, {
      once: true,
    });
  }

  start() {
    this._logicInStart();
    this._gameObjects.forEach((gameObject) => gameObject.setup());
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
    this._logicInUpdate();
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
