const { createGame, createObject, areObjectsInCollision, renderText } =
  gameEngine;

const GAME_WIDTH = 1000;
const GAME_HEIGHT = 600;

const PLAYER_SPEED = 2;
const CAT_SPEED = 1;

const { onLoad, onInit, onUpdate, onDraw, start, restart } = createGame({
  id: "game",
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
});

let playerSprite, catSpriteLeft, catSpriteRight, appleSprite;
let player, cat, apple1, apple2, apple3;
let isApple1Collected, isApple2Collected, isApple3Collected;
let collectedApples = 0;

onLoad(async (content) => {
  playerSprite = await content.loadSprite("player.png");
  catSpriteLeft = await content.loadSprite("cat-left.png");
  catSpriteRight = await content.loadSprite("cat-right.png");
  appleSprite = await content.loadSprite("apple.png");
});

onInit(() => {
  player = createObject(playerSprite, { x: 360, y: 220 });
  cat = createObject(catSpriteLeft, { x: 800, y: 480 });
  apple1 = createObject(appleSprite, { x: 100, y: 100 });
  apple2 = createObject(appleSprite, { x: 600, y: 500 });
  apple3 = createObject(appleSprite, { x: 700, y: 100 });

  isApple1Collected = false;
  isApple2Collected = false;
  isApple3Collected = false;

  collectedApples = 0;
  renderText("score", collectedApples);
});

onUpdate((keyboard) => {
  if (keyboard.isKeyDown("ArrowRight")) {
    player.x += PLAYER_SPEED;
  }

  if (keyboard.isKeyDown("ArrowLeft")) {
    player.x -= PLAYER_SPEED;
  }

  if (keyboard.isKeyDown("ArrowDown")) {
    player.y += PLAYER_SPEED;
  }

  if (keyboard.isKeyDown("ArrowUp")) {
    player.y -= PLAYER_SPEED;
  }

  if (collectedApples < 3) {
    if (cat.x < player.x) {
      cat.sprite = catSpriteRight;
      cat.x += CAT_SPEED;
    } else if (cat.x > player.x) {
      cat.sprite = catSpriteLeft;
      cat.x -= CAT_SPEED;
    }

    if (cat.y < player.y) {
      cat.y += CAT_SPEED;
    } else if (cat.y > player.y) {
      cat.y -= CAT_SPEED;
    }
  }

  if (!isApple1Collected && areObjectsInCollision(player, apple1)) {
    isApple1Collected = true;
    collectedApples += 1;
    renderText("score", collectedApples);
  }

  if (!isApple2Collected && areObjectsInCollision(player, apple2)) {
    isApple2Collected = true;
    collectedApples += 1;
    renderText("score", collectedApples);
  }

  if (!isApple3Collected && areObjectsInCollision(player, apple3)) {
    isApple3Collected = true;
    collectedApples += 1;
    renderText("score", collectedApples);
  }

  if (areObjectsInCollision(player, cat)) {
    restart();
  }

  if (player.x >= GAME_WIDTH) {
    player.x = -player.width;
  } else if (player.x <= -player.width) {
    player.x = GAME_WIDTH;
  }

  if (player.y >= GAME_HEIGHT) {
    player.y = -player.height;
  } else if (player.y <= -player.height) {
    player.y = GAME_HEIGHT;
  }
});

onDraw((canvas) => {
  canvas.clear();
  canvas.drawObject(cat);
  canvas.drawObject(player);

  if (!isApple1Collected) {
    canvas.drawObject(apple1);
  } else {
    canvas.drawSprite(apple1.sprite, { x: player.x - 10, y: player.y + 75 });
  }

  if (!isApple2Collected) {
    canvas.drawObject(apple2);
  } else {
    canvas.drawSprite(apple1.sprite, { x: player.x + 60, y: player.y + 80 });
  }

  if (!isApple3Collected) {
    canvas.drawObject(apple3);
  } else {
    canvas.drawSprite(apple3.sprite, { x: player.x + 50, y: player.y + 70 });
  }
});

start();
