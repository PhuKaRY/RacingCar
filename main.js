const mainGame = document.querySelector(".mainGame");
const score = document.querySelector(".score span");
const roadElement = document.querySelector(".road");
let startButton = document.querySelector("#start-button");
let initialText = document.querySelector("#initialText");
let frames = 0;
let scoreGame = 0;
let intervalId = null;

let gameOver = false;

startButton.addEventListener("click", startTheGame);
// let startButtons = (document.getElementById("#start-button").disable = true);

function startTheGame() {
  window.addEventListener("keydown", handleKeyPress);
  initialText.style.display = "none";
  createLoop();
}

function handleKeyPress(event) {
  //   console.log(event.code);
  switch (event.code) {
    case "ArrowRight":
      myCar.moveRight();
      break;
    case "ArrowLeft":
      myCar.moveLeft();
      break;
    case "ArrowUp":
      myCar.moveUp();
      break;
    case "ArrowDown":
      myCar.moveDown();
      break;
    default:
      return;
  }
}
const myCar = {
  divElement: document.querySelector(".car"),
  left: () => {
    const computedStyle = window.getComputedStyle(myCar.divElement);
    let currentPosition = parseInt(computedStyle.getPropertyValue("left"));
    return currentPosition;
  },
  top: () => {
    const computedStyle = window.getComputedStyle(myCar.divElement);
    let currentPosition = parseInt(computedStyle.getPropertyValue("top"));
    return currentPosition;
  },
  right: () => {
    return myCar.left() + 50;
  },
  bottom: () => {
    return myCar.top() + 80;
  },

  moveRight() {
    let currentPosition = this.left();
    currentPosition += 50; // 0 80 160 240 320 400
    if (!gameOver) {
      if (currentPosition >= 400) return;
      this.divElement.style.left = `${currentPosition}px`;
    }
  },
  moveLeft() {
    let currentPosition = this.left();
    currentPosition -= 50;
    if (!gameOver) {
      if (currentPosition < 0) return;
      this.divElement.style.left = `${currentPosition}px`;
    }
  },
  moveUp() {
    let currentPosition = this.top();
    currentPosition -= 50;
    if (!gameOver) {
      if (currentPosition < 0) return;
      this.divElement.style.top = `${currentPosition}px`;
    }
  },
  moveDown() {
    let currentPosition = this.top();
    currentPosition += 50;
    if (!gameOver) {
      if (currentPosition >= 750) return;
      this.divElement.style.top = `${currentPosition}px`;
    }
  },
};

function createLoop() {
  intervalId = setInterval(() => {
    let enemyCars = document.querySelectorAll(".enemyCars");
    frames++;
    scoreGame++;
    score.innerHTML = scoreGame;
    enemyCars.forEach((enemy) => {
      const computedStyle = window.getComputedStyle(enemy);
      let currentPosition = parseInt(computedStyle.getPropertyValue("top"));
      const leftPosition = parseInt(computedStyle.getPropertyValue("left"));
      currentPosition += 80;
      if (currentPosition > window.innerHeight) {
        enemy.remove();
      }
      enemy.style.top = `${currentPosition}px`;

      const enemyBottom = currentPosition + 80;
      const enemyTop = currentPosition;
      const enemyRight = leftPosition + 50;
      if (
        enemyBottom > myCar.top() &&
        enemyTop < myCar.bottom() &&
        enemyRight > myCar.left() &&
        leftPosition < myCar.right()
      ) {
        gameOver = true;
        console.log("We hit a car!!!");
        clearInterval(intervalId);
      }
    });
    if (frames % 2 === 0) {
      createEnemy();
    }
  }, 500);
}

function createEnemy() {
  const car = document.createElement("div");
  car.classList.add("enemyCars");
  roadElement.append(car);
  car.style.left = Math.floor(Math.random() * 364) + "px";
}
