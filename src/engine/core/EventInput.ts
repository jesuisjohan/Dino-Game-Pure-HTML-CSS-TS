class EventInput {
  _keyCode: string;
  _func: Function;
  _type: EventType;

  constructor(keyCode: string, func: Function, type: EventType) {
    this._keyCode = keyCode;

    this._func = func;
    this._type = type;
  }

  onKey(e: KeyboardEvent) {
    if (e.code == this._keyCode) this._func();
  }

  getType(): EventType {
    return this._type;
  }
}
