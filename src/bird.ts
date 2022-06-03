import {
  setCustomProperty,
  incrementCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty";

const SPEED = 0.07;
const BIRD_INTERVAL_MIN = 500 * 2;
const BIRD_INTERVAL_MAX = 2000 * 2;
const BIRD_FRAME_COUNT = 2;
const BIRD_FRAME_TIME = 400;
const worldElem = document.querySelector("[data-world]")!;

let nextBirdTime: number;
let birdFrame: number;
let currentBirdFrameTime: number;
export function setupBird() {
  nextBirdTime = BIRD_INTERVAL_MIN;
  birdFrame = 0;
  currentBirdFrameTime = 0;
  document.querySelectorAll("[data-bird]").forEach((bird) => {
    bird.remove();
  });
}

export function updateBird(delta: number, speedScale: number) {
  document.querySelectorAll<HTMLImageElement>("[data-bird]").forEach((bird) => {
    incrementCustomProperty(bird, "--left", delta * speedScale * SPEED * -1);

    if (currentBirdFrameTime >= BIRD_FRAME_TIME) {
      birdFrame = (birdFrame + 1) % BIRD_FRAME_COUNT;
      bird.src = `imgs/Bird${birdFrame}.png`;
      currentBirdFrameTime -= BIRD_FRAME_TIME;
    }
    currentBirdFrameTime += delta * speedScale;

    if (getCustomProperty(bird, "--left") <= -100) {
      bird.remove();
    }
  });

  if (nextBirdTime <= 0) {
    createBird();
    nextBirdTime =
      randomNumberBetween(BIRD_INTERVAL_MIN, BIRD_INTERVAL_MAX) / speedScale;
  }
  nextBirdTime -= delta;
}

export function getBirdRects() {
  return [...document.querySelectorAll("[data-bird]")].map((bird) => {
    return bird.getBoundingClientRect();
  });
}

function createBird() {
  const bird = document.createElement("img");
  bird.dataset.bird = "true";
  bird.src = "imgs/bird.png";
  bird.classList.add("bird"); // make it has all styles from stylesheet
  setCustomProperty(bird, "--left", 100); // all the way to the right side of screen
  worldElem.append(bird);
}

function randomNumberBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
