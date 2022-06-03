class Engine {
  private static _instance: Engine;
  private _lastTime: number | null;
  private _delta: number;
  private _logicInStart: Function;
  private _logicInUpdate: Function;

  private _gameObjects: GameObject[] = [];

  /**
   * 
   * @param logicInStart Set score, speedScale etc.
   * @param logicInUpdate Check lose
   * @param anyKeyToStart Automatically start or manually start game
   */
  constructor(logicInStart: Function, logicInUpdate: Function, anyKeyToStart: boolean = true) {
    Engine._instance = this;
    this._lastTime = null;
    this._delta = 0;
    this._logicInStart = logicInStart;
    this._logicInUpdate = logicInUpdate;
    if (anyKeyToStart) this.pressAnyKeyToStart()
  }

  pressAnyKeyToStart() {
    document.addEventListener(EventType.KeyDown, this.start, { once: true });
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
    this._gameObjects.forEach((gameObject) => gameObject.update());
    this._logicInUpdate();
    this._lastTime = time;
    window.requestAnimationFrame(this.update);
  }

  public get delta() {
    return this._delta;
  }

  public static get Instance() {
    return this._instance;
  }

  addGameObject(gameObject: GameObject) {
    this._gameObjects.push(gameObject);
  }
}
