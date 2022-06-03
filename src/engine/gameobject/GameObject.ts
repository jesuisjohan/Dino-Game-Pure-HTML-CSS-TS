class GameObject {
  private _name: string;
  private _elem: HTMLImageElement;
  private _transform: Transform;
  private _collider: Collider;
  private _spriteRenderer: SpriteRenderer;
  private _rb: RigidBody;
  private _anim: Animator;
  private _setupFunc: Function;
  private _updateFunc: Function;

  constructor(
    name: string,
    elem: HTMLImageElement,
    anim: Animator,
    setupFunc: Function,
    updateFunc: Function,
    imgName: string,
    classCSS: string
  ) {
    this._name = name;
    this._elem = elem; // sua cai nay thanh createElement
    this._transform = new Transform(this._elem);
    this._collider = new Collider(this._elem);
    this._spriteRenderer = new SpriteRenderer(this._elem, imgName, classCSS)
    this._rb = new RigidBody(this._elem);
    this._anim = anim;
    this._setupFunc = setupFunc;
    this._updateFunc = updateFunc;
  }

  private createElement(name: string, imgName: string): HTMLImageElement {
    const objectElem = document.createElement("img")
    objectElem.dataset[name] = "true"
    const imgPath = Loader.Instance.getImagePath(imgName)
    if (imgPath) objectElem.src = imgPath
    objectElem.classList.add(name)
    World.Instance.elem.append(objectElem)
    return objectElem
  }

  public setup() {
    this._setupFunc()
  }

  public update() {
    this._updateFunc()
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
}
