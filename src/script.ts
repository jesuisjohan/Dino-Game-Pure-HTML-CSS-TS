import { updateGround, setupGround } from "./ground";
import { updateDino, setupDino, getDinoRect, setDinoLose } from "./dino";
import { updateCactus, setupCactus, getCactusRects } from "./cactus";
import { updateBird, setupBird, getBirdRects } from "./bird";

const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const SPEED_SCALE_INCREASE = 0.00001;
const BIRD_SPAWNING_SCORE = 40;

const worldElem: HTMLElement =
  document.querySelector<HTMLElement>("[data-world]")!;
const scoreElem: HTMLElement =
  document.querySelector<HTMLElement>("[data-score]")!;
const startScreenElem: HTMLElement = document.querySelector<HTMLElement>(
  "[data-start-screen]"
)!;

setPixelToWorldScale();
window.addEventListener("resize", setPixelToWorldScale);
document.addEventListener("keydown", handleStart, { once: true });

let lastTime: number | null;
let speedScale: number;
let score: number;
function update(time: number) {
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }
  const delta = time - lastTime;

  updateGround(delta, speedScale);
  updateDino(delta, speedScale);
  updateCactus(delta, speedScale);
  if (score >= BIRD_SPAWNING_SCORE) updateBird(delta, speedScale);
  updateSpeedScale(delta);
  updateScore(delta);
  if (checkLose()) return handleLose();

  lastTime = time;
  window.requestAnimationFrame(update);
}

function checkLose() {
  const dinoRect = getDinoRect();
  return (
    getCactusRects().some((rect) => isCollision(rect, dinoRect)) ||
    getBirdRects().some((rect) => isCollision(rect, dinoRect))
  );
}

function isCollision(rect1: DOMRect, rect2: DOMRect) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  );
}

function updateSpeedScale(delta: number) {
  speedScale += delta * SPEED_SCALE_INCREASE;
}

function updateScore(delta: number) {
  score += delta * 0.01;
  scoreElem.textContent = Math.floor(score).toString();
}

function handleStart() {
  lastTime = null;
  speedScale = 1;
  score = 0;
  setupGround();
  setupDino();
  setupCactus();
  setupBird();
  startScreenElem.classList.add("hide");
  window.requestAnimationFrame(update);
}

function handleLose() {
  setDinoLose();
  setTimeout(() => {
    document.addEventListener("keydown", handleStart, { once: true });
    startScreenElem.classList.remove("hide");
  }, 100);
}

function setPixelToWorldScale() {
  let worldToPixelScale;
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH;
  } else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT;
  }
  worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
  worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
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

const inputManager = new NewInputManager()