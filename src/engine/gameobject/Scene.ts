class Scene {
  private _canvas: World;
  private _gameObjects: GameObject[];
  private _isLoaded: boolean;

  constructor(canvas: World) {
    this._canvas = canvas;
    this._gameObjects = [];
    this._isLoaded = false;
  }

  public addGameObject(gameObject: GameObject) {
    this._gameObjects.push(gameObject);
  }

  public get gameObjects(): GameObject[] {
    return this._gameObjects;
  }

  public get isLoaded() {
    return this._isLoaded;
  }

  public set isLoaded(isLoaded: boolean) {
    this._isLoaded = isLoaded;
  }
}
