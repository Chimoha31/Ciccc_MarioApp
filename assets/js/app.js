"use strict";

const mario = document.querySelector("#avatar");
const coin = document.querySelector("#coin");
const score = document.createElement("h1");
const body = document.querySelector("body");

let currentLocationX = 10;
let currentLocationY = 10;
let points = 0;
let marioWidth = 50;
let marioHeight = 50;

// viewport
const maxWidth = window.innerWidth;
const maxHeight = window.innerHeight;
// console.log(maxWidth);

// スコアを表示
score.textContent = `Score: ${points}`;
body.before(score);

// マリオがコインに触れた時のaudioをセット
const sound = new Audio("/smw_coin.wav");
sound.loop = false;

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
const moveHorizontal = (node, steps, windowWidth) => {
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

  //マリオがコインにタッチしたらコインをランダムで違う所に配置する
  if (isTouching(mario, coin)) {
    console.log(isTouching);
    const height = Math.floor(Math.random() * window.innerHeight);
    const width = Math.floor(Math.random() * window.innerWidth);
    coin.style.top = `${height}px`;
    coin.style.left = `${width}px`;

    // マリオがポイントGETしたら、表示されているポイント0から1、2、3...と加算させる
    points++;
    score.textContent = `Score: ${points}`;

    // マリオがコインにタッチしたらaudioが鳴る
    sound.play();

    // マリオがコインにタッチしたら、マリオのサイズを大きくする
    marioHeight += 30;
    marioWidth += 30;
    console.log(mario);
    mario.style.width = `${marioWidth}px`;
    mario.style.height = `${marioHeight}px`;
  }
});
