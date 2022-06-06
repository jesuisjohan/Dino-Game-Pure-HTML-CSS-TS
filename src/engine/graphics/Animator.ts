class Animator {
  private _elem: HTMLImageElement;
  private _frame: number;
  private _currentFrameTime: number;
  private _FRAME_TIME: number;
  private _frameCount: number;
  private _speedScale: number;
  private _animFrames: string[];

  constructor(
    elem: HTMLImageElement,
    frameTime: number,
    speedScale: number,
    animationFrame: string[]
  ) {
    this._elem = elem;
    this._frame = 0;
    this._currentFrameTime = 0;
    this._FRAME_TIME = frameTime;
    this._speedScale = speedScale;
    this._animFrames = animationFrame;
    this._frameCount = animationFrame.length;
  }

  updateAnim() {
    if (this._currentFrameTime >= this._FRAME_TIME) {
      this._frame = (this._frame + 1) % this._frameCount;
      this._elem.src = Loader.Instance.getImage(this._animFrames[this._frame])!;
      this._currentFrameTime -= this._FRAME_TIME;
    }
    this._currentFrameTime += Engine.Instance.delta * this._speedScale;
  }
}
