class GameObject {
  private _name: string;
  private _transform: Transform;
  private _collider: BoxCollider;
  private _spriteRenderer: SpriteRenderer;
  private _rb: RigidBody;
  private _anim: Animator | null = null;

  constructor(
    name: string,
    transform: Transform,
    imgName: string,
    anim?: Animator
  ) {
    this._name = name;
    this._transform = transform;
    this._collider = new BoxCollider();
    this._spriteRenderer = new SpriteRenderer(this._elem, imgName, name);
    this._rb = new RigidBody(this._elem);
    if (anim) this._anim = anim;
  }

  public setup() {}

  public update() {}

  public get name() {
    return this._name;
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
