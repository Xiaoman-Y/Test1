let displaySize = 50;   // how many pixels are visible in the game
let pixelSize = 20;     // how big each 'pixel' looks on screen

let playerOne;    // Adding 2 players to the game
let playerTwo;
//let target;       // and one target for players to catch.

let display;      // Aggregates our final visual output before showing it on the screen
let controller;   // This is where the state machine and game logic lives
let collisionAnimation;   // Where we store and manage the collision animation
let score;        // Where we keep track of score and winner

let golds = [];   // 用于存储 gold 的位置
let rocks = [];   // 用于存储 rock 的位置

function setup() {
  let canvas = createCanvas(displaySize * pixelSize, pixelSize);
  canvas.parent('game-container'); // 将画布附加到HTML容器上

  display = new Display(displaySize, pixelSize);        // Initializing the display
  playerOne = new Player(color(255, 0, 0), parseInt(random(0, displaySize)), displaySize);   
  playerTwo = new Player(color(140, 0, 255), parseInt(random(0, displaySize)), displaySize);
  //target = new Player(color(2, 70, 0), parseInt(random(0, displaySize)), displaySize); 

  collisionAnimation = new Animation();     // Initializing animation
  controller = new Controller();            // Initializing controller
  score = { max: 3, winner: color(0, 0, 0) };     // score stores max number of points, and color 
}

function draw() {
  background(220,220,220);
  controller.update(); // 更新游戏状态
  display.show(); // 显示当前的像素
}
