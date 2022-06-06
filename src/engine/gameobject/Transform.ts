class Transform {
  private _x: number;
  private _y: number;

  constructor(x: number = 0, y: number = 0) {
    this._x = x;
    this._y = y;
  }

  public get x() {
    return this._x;
  }
  public get y() {
    return this._y;
  }
  public set x(x: number) {
    this._x = x;
  }
  public set y(y: number) {
    this._y = y;
  }
}
