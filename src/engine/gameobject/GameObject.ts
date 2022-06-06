class GameObject {
  private _name: string;
  private _elem: HTMLImageElement;
  private _transform: Transform;
  private _collider: Collider;
  private _spriteRenderer: SpriteRenderer;
  private _rb: RigidBody;
  private _anim: Animator | null = null;
  private _setupFunc: Function;
  private _updateFunc: Function;

  constructor(
    name: string,
    imgName: string,
    setupFunc: Function,
    updateFunc: Function,
    anim?: Animator
  ) {
    this._name = name;
    this._elem = this.createElement(name, imgName);
    this._transform = new Transform(this._elem);
    this._collider = new Collider(this._elem);
    this._spriteRenderer = new SpriteRenderer(this._elem, imgName, name);
    this._rb = new RigidBody(this._elem);
    if (anim) this._anim = anim;
    this._setupFunc = setupFunc;
    this._updateFunc = updateFunc;
  }

  private createElement(name: string, imgName: string): HTMLImageElement {
    const objectElem = document.createElement("img");
    objectElem.dataset[name] = "true";
    const imgPath = Loader.Instance.getImagePath(imgName);
    if (imgPath) objectElem.src = imgPath;
    objectElem.classList.add(name);
    World.Instance.elem.append(objectElem);
    return objectElem;
  }

  public setPlayerProperties(
    left: number = 1,
    height: number = 30,
    moveUnit: number = 1
  ) {
    PhysicsEngine.setCustomProperty(this._elem, "--bottom", 0);
    PhysicsEngine.setCustomProperty(this._elem, "position", "absolute");
    PhysicsEngine.setCustomProperty(this._elem, "left", `${left}%`);
    PhysicsEngine.setCustomProperty(this._elem, "height", `${height}%`);
    PhysicsEngine.setCustomProperty(
      this._elem,
      "bottom",
      `calc(var(--bottom) * ${moveUnit}%)`
    );
  }

  public setObstacleProperties(
    bottom: number = 0,
    height: number = 30,
    moveUnit: number = 1,
    moveLeft: boolean = true
  ) {
    PhysicsEngine.setCustomProperty(this._elem, "position", "absolute");
    if (moveLeft)
      PhysicsEngine.setCustomProperty(
        this._elem,
        "left",
        `calc(var(--left) * ${moveUnit}%)`
      );
    else
      PhysicsEngine.setCustomProperty(
        this._elem,
        "right",
        `calc(var(--right) * ${moveUnit}%)`
      );
    PhysicsEngine.setCustomProperty(this._elem, "height", `${height}%`);
    PhysicsEngine.setCustomProperty(this._elem, "bottom", `${bottom}%`);
  }

  public setGroundProperties(
    width: number = 300,
    bottom: number = 0,
    moveUnit: number = 1,
    moveLeft: boolean = true
  ) {
    if (moveLeft) {
      PhysicsEngine.setCustomProperty(this._elem, "--left", 0);
      PhysicsEngine.setCustomProperty(
        this._elem,
        "left",
        `calc(var(--left) * ${moveUnit}%)`
      );
    } else {
      PhysicsEngine.setCustomProperty(this._elem, "--right", 0);
      PhysicsEngine.setCustomProperty(
        this._elem,
        "right",
        `calc(var(--right) * ${moveUnit}%)`
      );
    }
    PhysicsEngine.setCustomProperty(this._elem, "position", "absolute");
    PhysicsEngine.setCustomProperty(this._elem, "width", `${width}%`);
    PhysicsEngine.setCustomProperty(this._elem, "bottom", `${bottom}%`);
    PhysicsEngine.setCustomProperty(this._elem, "bottom", `${bottom}%`);
  }

  public setup() {
    this._setupFunc();
  }

  public update() {
    this._updateFunc();
  }

  public get name() {
    return this._name;
  }

  public get elem() {
    return this._elem;
  }

  public get transform() {
    return this._transform;
  }
  public get collider() {
    return this._collider;
  }
  public get spriteRenderer() {
    return this._spriteRenderer;
  }
  public get rigidBody() {
    return this._rb;
  }
  public get animation() {
    return this._anim;
  }

  public set animation(animation: Animator | null) {
    this._anim = animation;
  }
}
