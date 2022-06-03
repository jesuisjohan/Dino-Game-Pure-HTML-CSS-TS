namespace GameManager {
  const WORLD_WIDTH = 100;
  const WORLD_HEIGHT = 30;
  const SPEED_SCALE_INCREASE = 0.00001;
  const BIRD_SPAWNING_SCORE = 40;

  const world = new World(WORLD_WIDTH, WORLD_HEIGHT);

  const scoreUI = new UIElement("score", 3, "right: 1vmin; top: 1vmin;", "0");

  const startScreenUI = new UIElement(
    "start-screen",
    3,
    "top: 50%; left: 50%; transform: translate(-50%, -50%);",
    "Press Any Key To Start"
  );

  const inputManager = new InputManager();
  const loader = new Loader();

  export let speedScale: number;
  let score: number;

  function startLogic() {
    speedScale = 1;
    score = 0;
    startScreenUI.isHidden = true;
  }

  function updateLogic() {}
}
