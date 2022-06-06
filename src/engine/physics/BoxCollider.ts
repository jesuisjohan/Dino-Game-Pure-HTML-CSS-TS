class BoxCollider {
  private _rect: DOMRect;

  constructor(elem: Element = new Element) {
    this._rect = elem.getBoundingClientRect();
  }

  public isCollision(other: DOMRect | BoxCollider): boolean {
    if (other instanceof DOMRect)
      return (
        this._rect.left < other.right &&
        this._rect.top < other.bottom &&
        this._rect.right > other.left &&
        this._rect.bottom > other.top
      );
    else
      return (
        this._rect.left < other._rect.right &&
        this._rect.top < other._rect.bottom &&
        this._rect.right > other._rect.left &&
        this._rect.bottom > other._rect.top
      );
  }
}
