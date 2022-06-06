
/**
* @class
* @classdesc Provides a simple input facade.
*/
class InputManager {
  private _inputStack: EventInput[];

  constructor() {
    this._inputStack = [];
  }

  push(input: EventInput) {
    this._inputStack.push(input);
    // make sure no previous listener
    document.removeEventListener(input.getType(), input.onKey);
    document.addEventListener(input.getType(), input.onKey);
  }

  addAllListeners() {
    this._inputStack.forEach((input) => {
      document.addEventListener(input.getType(), input.onKey);
    });
  }
  
  removeAllListeners() {
    this._inputStack.forEach((input) => {
      document.removeEventListener(input.getType(), input.onKey);
    });
  }

  reset() {
    this.removeAllListeners();
    this._inputStack = [];
  }
}

class NewInputManager {
  keys: string[];
  constructor() {
    this.keys = [];
    window.addEventListener("keydown", (e) => {
      if (
        (e.key == "ArrowUp" || e.key == "ArrowDown" || e.key == "Space") &&
        this.keys.indexOf(e.key) == -1
      )
        this.keys.push(e.key);
    });
    window.addEventListener("keyup", (e) => {
      if (e.key == "ArrowUp" || e.key == "ArrowDown" || e.key == "Space")
        this.keys.splice(this.keys.indexOf(e.key), 1);
    });
  }
}