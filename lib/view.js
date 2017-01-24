import Game from './game';
import { GENERATE_SHAPE_FRAME } from './vars';

class View {
  constructor() {
    const canvasEl = document.getElementById("canvas");
    this.ctx = canvasEl.getContext("2d");
    this.timer = 0;
    this.keyLeft = false;
    this.keyRight = false;
    this.topScore = 0;
    this.currentScore = 0;

    this.handleInput();
  }

  start() {
    this.game = new Game(this.ctx);
    this.player = this.game.player;
    this.handleInput();
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
      e.preventDefault();
      if (e.code === "Space") {
        this.handleSpace();
      }
    });
  }

  handleSpace() {
    if (this.game === undefined || this.game.gameOver) {
      this.game = new Game(this.ctx);
      this.player = this.game.player;
      this.start();
    }
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
    if (this.timer % GENERATE_SHAPE_FRAME === 0) {
      this.game.generateShape();
    }
    this.game.tick();
    if (this.game.gameOver) {
      this.currentScore = this.game.count;
      if (this.currentScore > this.topScore) {
        this.topScore = this.currentScore;
      }
      console.log(this.currentScore, this.topScore);
    } else {
      requestAnimationFrame(this.frame.bind(this));
    }
  }

}

const view = new View();
