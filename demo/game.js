const { createGame } = gameEngine;

const GAME_WIDTH = 1000;
const GAME_HEIGHT = 600;

const PLAYER_SPEED = 2;
const CAT_SPEED = 1;

const game = createGame({
  id: "game",
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
});

let playerSprite, catSpriteLeft, catSpriteRight, appleSprite;
let player, cat, apple1, apple2, apple3;
let isApple1Collected, isApple2Collected, isApple3Collected;
let collectedApples = 0;

game.onLoad(async () => {
  playerSprite = await game.loadSprite("player.png");
  catSpriteLeft = await game.loadSprite("cat-left.png");
  catSpriteRight = await game.loadSprite("cat-right.png");
  appleSprite = await game.loadSprite("apple.png");
});

game.onInit(() => {
  player = game.createObject(playerSprite, { x: 360, y: 220 });
  cat = game.createObject(catSpriteLeft, { x: 800, y: 480 });
  apple1 = game.createObject(appleSprite, { x: 100, y: 100 });
  apple2 = game.createObject(appleSprite, { x: 600, y: 500 });
  apple3 = game.createObject(appleSprite, { x: 700, y: 100 });

  isApple1Collected = false;
  isApple2Collected = false;
  isApple3Collected = false;
  collectedApples = 0;
  game.renderText("score", collectedApples);
});

game.onUpdate(() => {
  if (game.isKeyDown("ArrowRight")) {
    player.x += PLAYER_SPEED;
  }

  if (game.isKeyDown("ArrowLeft")) {
    player.x -= PLAYER_SPEED;
  }

  if (game.isKeyDown("ArrowDown")) {
    player.y += PLAYER_SPEED;
  }

  if (game.isKeyDown("ArrowUp")) {
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

  if (!isApple1Collected && game.areObjectsInCollision(player, apple1)) {
    isApple1Collected = true;
    collectedApples += 1;
    game.renderText("score", collectedApples);
  }

  if (!isApple2Collected && game.areObjectsInCollision(player, apple2)) {
    isApple2Collected = true;
    collectedApples += 1;
    game.renderText("score", collectedApples);
  }

  if (!isApple3Collected && game.areObjectsInCollision(player, apple3)) {
    isApple3Collected = true;
    collectedApples += 1;
    game.renderText("score", collectedApples);
  }

  if (game.areObjectsInCollision(player, cat)) {
    game.restart();
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

game.onDraw(() => {
  game.clearCanvas();

  game.drawObject(cat);
  game.drawObject(player);

  if (!isApple1Collected) {
    game.drawObject(apple1);
  } else {
    game.drawSprite(apple1.sprite, { x: player.x - 10, y: player.y + 75 });
  }

  if (!isApple2Collected) {
    game.drawObject(apple2);
  } else {
    game.drawSprite(apple1.sprite, { x: player.x + 60, y: player.y + 80 });
  }

  if (!isApple3Collected) {
    game.drawObject(apple3);
  } else {
    game.drawSprite(apple3.sprite, { x: player.x + 50, y: player.y + 70 });
  }
});

game.start();
