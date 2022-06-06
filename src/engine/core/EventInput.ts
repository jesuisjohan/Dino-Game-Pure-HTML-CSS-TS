enum EventTypeEnum {
  KeyUp = "keyup",
  KeyDown = "keydown",
}

class EventInput {
  _keyCode: string;
  _func: Function;
  _type: EventTypeEnum;

  constructor(keyCode: string, func: Function, type: EventTypeEnum) {
    this._keyCode = keyCode;
    this._func = func;
    this._type = type;
  }

  onKey(e: KeyboardEvent) {
    if (e.code == this._keyCode) this._func();
  }

  getType(): EventTypeEnum {
    return this._type;
  }
}
