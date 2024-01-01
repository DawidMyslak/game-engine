# Game engine for web

Micro-framework for 2D game development in JavaScript

# Demo

**[Check demo directory](demo)** for more advanced implementation, you can also **[click here to play demo online](http://adam.myslak.me)**.

# Sample usage

### index.html

```html
<body>
  <canvas id="game"></canvas>

  <!-- load framework -->
  <script src="game-engine.js"></script>

  <!-- load your game -->
  <script src="game.js"></script>
</body>
```

### game.js

```javascript
const { createGame, createObject, areObjectsInCollision } = gameEngine;

const { onLoad, onInit, onUpdate, onDraw, start, restart } = createGame({
  id: "game",
  width: 800,
  height: 600,
});

let playerSprite, wallSprite;
let player, wall;

onLoad(async (content) => {
  playerSprite = await content.loadSprite("player.png");
  wallSprite = await content.loadSprite("wall.png");
});

onInit(() => {
  player = createObject(playerSprite, { x: 200, y: 0 });
  wall = createObject(wallSprite, { x: 400, y: 0 });
});

onUpdate((keyboard) => {
  if (keyboard.isKeyDown("ArrowRight")) {
    player.x += 1;
  }

  if (keyboard.isKeyDown("ArrowLeft")) {
    player.x -= 1;
  }

  if (areObjectsInCollision(player, wall)) {
    restart();
  }
});

onDraw((canvas) => {
  canvas.clear();
  canvas.drawObject(player);
  canvas.drawObject(wall);
});

start();
```
