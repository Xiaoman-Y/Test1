class Controller {
    constructor() {
      this.gameState = "PLAY";
      this.startTime = millis(); // 记录游戏开始时间
      this.lastDropTime = 0; // 记录最后一个gold或rock掉落的时间
    }
  
    update() {
      let currentTime = millis();
  
      // 如果时间超过60秒，则进入SCORE状态
      if ((currentTime - this.startTime) > 60000 && this.gameState === "PLAY") {
        this.gameState = "SCORE";
      }
  
      switch (this.gameState) {
        case "PLAY":
          display.clear();
  
          // 显示玩家
          display.setPixel(playerOne.position, playerOne.playerColor);
          display.setPixel(playerTwo.position, playerTwo.playerColor);
  
          // 检查是否需要生成新的 gold 和 rock
          if ((currentTime - this.lastDropTime) > 2000) { // 每隔2秒掉落
            let newGoldPos = parseInt(random(0, displaySize));
            let newRockPos = parseInt(random(0, displaySize));
  
            // 确保 gold 和 rock 之间的距离至少为2个像素
            while (abs(newGoldPos - newRockPos) < 2) {
              newRockPos = parseInt(random(0, displaySize));
            }
  
            if (golds.length < 10) {
              golds.push(newGoldPos);
              console.log(`Gold dropped at position ${newGoldPos}`);
            }
            if (rocks.length < 10) {
              rocks.push(newRockPos);
              console.log(`Rock dropped at position ${newRockPos}`);
            }
  
            this.lastDropTime = currentTime;  // 更新最后一次掉落的时间
          }
  
          // 显示所有的 gold 和 rock
          golds.forEach(pos => {
            display.setPixel(pos, color(255, 255, 0));  // 黄色gold
          });
          rocks.forEach(pos => {
            display.setPixel(pos, color(200, 200, 200));  // 浅灰色rock
          });
  
          // 检查玩家是否碰到 gold 或 rock
          if (golds.includes(playerOne.position)) {
            golds = golds.filter(pos => pos !== playerOne.position); // 玩家1碰到gold后移除
            console.log('Player One collected a gold');
          }
          if (rocks.includes(playerTwo.position)) {
            rocks = rocks.filter(pos => pos !== playerTwo.position); // 玩家2碰到rock后移除
            console.log('Player Two collected a rock');
          }
  
          break;
  
        case "SCORE":
          playerOne.score = 0;
          playerTwo.score = 0;
          target.position = parseInt(random(1, displaySize));
          display.setAllPixels(score.winner);
          break;
  
        default:
          break;
      }
    }
  }
  
  function keyPressed() {
    if (key == 'A' || key == 'a') {
      playerOne.move(-1);
    }
  
    if (key == 'D' || key == 'd') {
      playerOne.move(1);
    }
  
    if (key == 'J' || key == 'j') {
      playerTwo.move(-1);
    }
  
    if (key == 'L' || key == 'l') {
      playerTwo.move(1);
    }
  
    if (key == 'R' || key == 'r') {
      controller.gameState = "PLAY";
      controller.startTime = millis();  // 重置开始时间
      golds = [];
      rocks = [];
    }
  }
  