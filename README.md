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
const { createGame } = gameEngine;

const game = createGame({
  id: "game",
  width: 800,
  height: 600,
});

let playerSprite, wallSprite;
let player, wall;

game.onLoad(async () => {
  playerSprite = await game.loadSprite("player.png");
  wallSprite = await game.loadSprite("wall.png");
});

game.onInit(() => {
  player = game.createObject(playerSprite, { x: 200, y: 0 });
  wall = game.createObject(wallSprite, { x: 400, y: 0 });
});

game.onUpdate(() => {
  if (game.isKeyDown("ArrowRight")) {
    player.x += 1;
  }

  if (game.isKeyDown("ArrowLeft")) {
    player.x -= 1;
  }

  if (game.areObjectsInCollision(player, wall)) {
    game.restart();
  }
});

game.onDraw(() => {
  game.clearCanvas();

  game.drawObject(player);
  game.drawObject(wall);
});

game.start();
```
