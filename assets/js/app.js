"use strict";

const mario = document.querySelector("#avatar");
const coin = document.querySelector("#coin");
const score = document.createElement("h1");
const body = document.querySelector("body");

let currentLocationX = 10;
let currentLocationY = 10;
let randomX = Math.random() * 10;
let points = 0;
let height01 = 50;
let width01 = 50;

score.textContent = `Score: ${points}`;
body.before(score);


// マリオがcoinにタッチ
function isTouching(a, b) {
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();

  return !(
    aRect.top + aRect.height < bRect.top ||
    aRect.top > bRect.top + bRect.height ||
    aRect.left + aRect.width < bRect.left ||
    aRect.left > bRect.left + bRect.width
  );
}

// X軸方向に動く
const moveHorizontal = (node, steps) => {
  currentLocationX += steps;
  console.log(currentLocationX);
  node.style.left = `${currentLocationX}px`;
};

// Y軸方向に動く
const moveVertical = (node, steps) => {
  currentLocationY += steps;
  console.log(currentLocationY);
  node.style.top = `${currentLocationY}px`;
};



// keydownの上下右左のキー次第でそれぞれの方向に向かう
window.addEventListener("keydown", function (e) {
  console.log(e.key);
  if (e.key == "ArrowUp") {
    moveVertical(mario, -30);
  } else if (e.key == "ArrowRight") {
    moveHorizontal(mario, 30);
    mario.style.transform = "scale(1,1)";
  } else if (e.key == "ArrowDown") {
    moveVertical(mario, 30);
  } else if (e.key == "ArrowLeft") {
    mario.style.transform = "scale(-1, 1)";
    moveHorizontal(mario, -30);
  } else {
    // return false;
  }

//マリオがコインにタッチしたら動くようにする 
  if (isTouching(mario, coin)) {
    console.log(isTouching);
    const height = Math.floor(Math.random() * window.innerHeight);
    const width = Math.floor(Math.random() * window.innerWidth);
    coin.style.top = `${height}px`;
    coin.style.left = `${width}px`;

    // ポイント加算したらブラウザに出る
    points++;
    score.textContent = `Score: ${points}`;

    // コインにタッチしたら音が鳴る
    const sound = new Audio('/smw_coin.wav');
    sound.play();

    // marioのサイズを大きくする
    height01 += 30;
    width01 += 30;
    console.log(mario);
    mario.style.height = `${height01}px`;
    mario.style.width = `${width01}px`;
  }
});
