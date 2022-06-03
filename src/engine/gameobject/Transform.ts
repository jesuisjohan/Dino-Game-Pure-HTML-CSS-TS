class Transform {
  private _elem: HTMLImageElement;

  constructor(elem: HTMLImageElement) {
    this._elem = elem;
  }

  public setX(x: number) {
    PhysicsEngine.setCustomProperty(this._elem, "--left", x);
  }

  public getX() {
    return PhysicsEngine.getCustomProperty(this._elem, "--left");
  }

  public setHeight(height: number) {
    PhysicsEngine.setCustomProperty(this._elem, "height", height);
  }

  public getHeight() {
    return PhysicsEngine.getCustomProperty(this._elem, "height");
  }
}
