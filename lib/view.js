import Game from './game';

class View {
  constructor() {
    const canvasEl = document.getElementById("canvas");
    this.ctx = canvasEl.getContext("2d");
    this.game = new Game(this.ctx);
    this.stage = this.game.stage;
    this.player = this.game.player;
    this.keyLeft = false;
    this.keyRight = false;
    this.timer = 0;
    this.pause = false;
  }

  start() {
    this.handleInput();
    // setInterval(this.frame.bind(this), 1000/60);
    requestAnimationFrame(this.frame.bind(this));
  }

  handleInput() {
    const player = this.player;
    document.addEventListener("keydown", e => {
      this.handleKeyDown(e);
    });
    document.addEventListener("keyup", e => {
      this.handleKeyUp(e);
    });

    document.addEventListener("keypress", e => {
      console.log(e);
      if (e.code === "Space") {
        console.log(this.pause);
        this.pause = !this.pause;
        if (!this.pause) {
          requestAnimationFrame(this.frame.bind(this));
        }
      }
    });
  }

  handleKeyDown(e) {
    if (e.key === "ArrowRight") {
      this.keyRight = true;
    } else if (e.key === "ArrowLeft") {
      this.keyLeft = true;
    }
  }

  handleKeyUp(e) {
    if (e.key === "ArrowRight") {
      this.keyRight = false;
    } else if (e.key === "ArrowLeft") {
      this.keyLeft = false;
    }
  }

  frame() {
    if (this.keyLeft) {
      this.player.handleMove(-9);
    } else if (this.keyRight) {
      this.player.handleMove(9);
    }
    this.timer += 1;
    if (this.timer % 45 === 0) {
      this.game.generateShape();
    }
    this.game.tick();
    if (!this.game.gameOver && !this.pause) {
      requestAnimationFrame(this.frame.bind(this));
    }
  }

}

const view = new View();
view.start();
