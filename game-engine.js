const gameEngine = {
  createGame: function (options) {
    /*
     * Create canvas and context
     */

    const canvasElement = document.getElementById(options.id);
    if (!canvasElement) return;

    const ctx = canvasElement.getContext("2d");

    canvasElement.width = options.width;
    canvasElement.height = options.height;

    const canvas = {
      clear: () => {
        ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      },
      drawSprite: (sprite, position) => {
        ctx.drawImage(sprite, position.x, position.y);
      },
      drawObject: (object) => {
        ctx.drawImage(object.sprite, object.x, object.y);
      },
    };

    /*
     * Load and cache sprite images
     */

    const cachedSprites = {};

    const content = {
      loadSprite: async (src) => {
        if (!cachedSprites[src]) {
          cachedSprites[src] = new Promise((resolve, reject) => {
            const sprite = new Image();
            sprite.src = src;
            sprite.onload = () => resolve(sprite);
            sprite.onerror = reject;
          });
        }

        return cachedSprites[src];
      },
    };

    /*
     * Keyboard state
     */

    let keys = {};

    const keyboard = {
      isKeyDown: (keyCode) => !!keys[keyCode],
    };

    window.addEventListener("keydown", (e) => {
      keys[e.key] = true;
    });

    window.addEventListener("keyup", (e) => {
      keys[e.key] = false;
    });

    /*
     * Callbacks references
     */

    let onLoadCallback, onInitCallback, onUpdateCallback, onDrawCallback;

    /*
     * Game loop
     */

    function runGameLoop() {
      if (onUpdateCallback) onUpdateCallback(keyboard);
      if (onDrawCallback) onDrawCallback(canvas);
      requestAnimationFrame(runGameLoop);
    }

    async function start() {
      if (onLoadCallback) await onLoadCallback(content);
      if (onInitCallback) onInitCallback();
      runGameLoop();
    }

    function restart() {
      if (onInitCallback) onInitCallback();
    }

    /*
     * Public API interface
     */
    return {
      onLoad: (callback) => {
        onLoadCallback = callback;
      },
      onInit: (callback) => {
        onInitCallback = callback;
      },
      onUpdate: (callback) => {
        onUpdateCallback = callback;
      },
      onDraw: (callback) => {
        onDrawCallback = callback;
      },
      start,
      restart,
    };
  },
  createObject: (sprite, position) => {
    return {
      sprite,
      x: position.x,
      y: position.y,
      width: sprite.width,
      height: sprite.height,
    };
  },
  areObjectsInCollision: (object1, object2) => {
    return (
      object1.x < object2.x + object2.width &&
      object1.x + object1.width > object2.x &&
      object1.y < object2.y + object2.height &&
      object1.y + object1.height > object2.y
    );
  },
  renderText: (id, text) => {
    const element = document.getElementById(id);
    if (!element) return;

    element.innerHTML = text;
  },
};
