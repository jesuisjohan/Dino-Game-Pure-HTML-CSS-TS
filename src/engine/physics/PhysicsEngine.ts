class PhysicsEngine {
  private _gravity = 0.0015;
  private _rb: RigidBody;
  private _isJumping = false;
  private _yVelocity = 0;
  private _gravityScale = 1;

  constructor(rb: RigidBody) {
    this._rb = rb;
  }

  public set gravity(val: number) {
    this._gravity = val;
  }

  public moveHorizontal(
    isRight: boolean = false,
    xVelocity: number,
    speedScale: number
  ) {
    PhysicsEngine.incrementCustomProperty(
      this._rb.elem,
      "--left",
      this._rb.mass *
        Engine.Instance.delta *
        speedScale *
        xVelocity *
        (isRight ? 1 : -1)
    );
  }

  public startJumping(jumpSpeed: number, gravityScale?: number) {
    this._yVelocity = jumpSpeed;
    this._isJumping = true;
    if (gravityScale) this._gravityScale = gravityScale;
  }

  public jump(applyGravityScale: boolean) {
    if (!this._isJumping) return;
    PhysicsEngine.incrementCustomProperty(
      this._rb.elem,
      "--bottom",
      this._yVelocity * Engine.Instance.delta * this._rb.mass
    );

    if (PhysicsEngine.getCustomProperty(this._rb.elem, "--bottom") <= 0) {
      // reached the peak
      PhysicsEngine.setCustomProperty(this._rb.elem, "--bottom", 0);
      this._isJumping = false;
    }

    if (applyGravityScale) {
      this._yVelocity -=
        this._rb.mass *
        this._gravity *
        Engine.Instance.delta *
        this._gravityScale;
    } else {
      this._yVelocity -= this._rb.mass * this._gravity * Engine.Instance.delta;
    }
  }

  public static getCustomProperty(elem: HTMLImageElement, prop: string) {
    return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0;
  }

  public static setCustomProperty(
    elem: HTMLImageElement,
    prop: string,
    value: number | string
  ) {
    if (typeof value === "number") {
      elem.style.setProperty(prop, value.toString());
    } else {
      elem.style.setProperty(prop, value);
    }
  }

  public static incrementCustomProperty(
    elem: HTMLImageElement,
    prop: string,
    inc: number
  ) {
    this.setCustomProperty(
      elem,
      prop,
      this.getCustomProperty(elem, prop) + inc
    );
  }
}
