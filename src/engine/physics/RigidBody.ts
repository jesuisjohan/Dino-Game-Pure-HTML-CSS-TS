class RigidBody {
  private _elem: HTMLImageElement;
  private _mass: number;

  constructor(elem: HTMLImageElement, mass: number = 1) {
    this._elem = elem;
    this._mass = mass;
  }

  public get elem(): HTMLImageElement {
    return this._elem;
  }

  public get mass(): number {
    return this._mass;
  }

  public set mass(value: number) {
    this._mass = value;
  }
}
