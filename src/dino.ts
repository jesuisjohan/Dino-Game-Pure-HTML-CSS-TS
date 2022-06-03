import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty";

let dinoElem: HTMLImageElement = document.querySelector("[data-dino]")!;
const JUMP_SPEED = 0.45;
const GRAVITY = 0.0015;
const DINO_FRAME_COUNT = 2;
const FRAME_TIME = 100;
const DUCKING_SCALE = 5;

const NORMAL_HEIGHT = 30;
const DUCK_HEIGHT = 20;

let isJumping: boolean;
let isDucking: boolean;
let dinoFrame: number;
let currentFrameTime: number;
let yVelocity: number;
export function setupDino() {
  isJumping = false;
  isDucking = false;
  dinoFrame = 0;
  currentFrameTime = 0;
  yVelocity = 0;
  setCustomProperty(dinoElem, "--bottom", 0);
  document.removeEventListener("keydown", onJump);
  document.removeEventListener("keydown", onDuck);
  document.removeEventListener("keyup", offDuck);

  document.addEventListener("keydown", onJump);
  document.addEventListener("keydown", onDuck);
  document.addEventListener("keyup", offDuck);
}

export function updateDino(delta: number, speedScale: number) {
  handleRun(delta, speedScale);
  handleJump(delta);
}

export function getDinoRect() {
  return dinoElem.getBoundingClientRect();
}

export function setDinoLose() {
  dinoElem.src = "imgs/dino-lose.png";
  if (isDucking) {
    setCustomProperty(dinoElem, "height", `${DUCK_HEIGHT}%`);
  } else {
    setCustomProperty(dinoElem, "height", `${NORMAL_HEIGHT}%`);
  }
}

function handleRun(delta: number, speedScale: number) {
  if (isJumping) {
    if (isDucking) {
      dinoElem.src = `imgs/DinoDuck0.png`;
      setCustomProperty(dinoElem, "height", `${DUCK_HEIGHT}%`);
    } else {
      dinoElem.src = `imgs/dino-stationary.png`;
      setCustomProperty(dinoElem, "height", `${NORMAL_HEIGHT}%`);
    }
    return;
  }

  if (currentFrameTime >= FRAME_TIME) {
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT;
    if (isDucking) {
      dinoElem.src = `imgs/DinoDuck${dinoFrame}.png`;
      setCustomProperty(dinoElem, "height", `${DUCK_HEIGHT}%`);
    } else {
      dinoElem.src = `imgs/dino-run-${dinoFrame}.png`;
      setCustomProperty(dinoElem, "height", `${NORMAL_HEIGHT}%`);
    }
    currentFrameTime -= FRAME_TIME;
  }
  currentFrameTime += delta * speedScale;
}

function handleJump(delta: number) {
  if (!isJumping) return;
  incrementCustomProperty(dinoElem, "--bottom", yVelocity * delta);

  if (getCustomProperty(dinoElem, "--bottom") <= 0) {
    // reached the peak
    setCustomProperty(dinoElem, "--bottom", 0);
    isJumping = false;
  }

  if (isDucking) {
    yVelocity -= GRAVITY * delta * DUCKING_SCALE;
  } else {
    yVelocity -= GRAVITY * delta;
  }
}

function onJump(e: KeyboardEvent) {
  if (isJumping) return;
  if (e.code === "Space" || e.code === "ArrowUp") {
    yVelocity = JUMP_SPEED;
    isJumping = true;
  }
}

function onDuck(e: KeyboardEvent) {
  if (isDucking) return;

  if (e.code === "ArrowDown") isDucking = true;
}

function offDuck(e: KeyboardEvent) {
  if (!isDucking) return;

  if (e.code === "ArrowDown") isDucking = false;
}
