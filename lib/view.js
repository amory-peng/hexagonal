import Game from './game';
import { GENERATE_SHAPE_FRAME, PLAYER_SENSITIVITY } from './vars';

class View {
  constructor() {
    const canvasEl = document.getElementById("canvas");
    this.ctx = canvasEl.getContext("2d");
    this.keyLeft = false;
    this.keyRight = false;
    this.topScore = 0;
    this.currentScore = 0;
    this.handleInput();
  }

  start() {
    this.timer = 0;
    this.game = new Game(this.ctx);
    this.player = this.game.player;
    this.currentScore = 0;
    this.generateRate = GENERATE_SHAPE_FRAME;
    this.difficulty = 0;
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
      document.getElementById("pre-game").style.visibility="hidden";
      document.getElementById("post-game").style.visibility="hidden";

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
      this.player.handleMove(-PLAYER_SENSITIVITY);
    } else if (this.keyRight) {
      this.player.handleMove(PLAYER_SENSITIVITY);
    }
    this.timer++;
    if (this.timer === this.generateRate) {
      this.game.generateShape();
      if (this.difficulty + 30 < GENERATE_SHAPE_FRAME) {
        this.difficulty += 1;
      }
      this.generateRate += GENERATE_SHAPE_FRAME - this.difficulty;
    }

    this.game.tick();
    if (this.game.gameOver) {
      document.getElementById("post-game").style.visibility="visible";
      this.currentScore = this.game.count;
      if (this.currentScore > this.topScore) {
        this.topScore = this.currentScore;
      }
      document.getElementById("score").innerHTML = this.currentScore;
      document.getElementById("top-score").innerHTML = this.topScore;

    } else {
      requestAnimationFrame(this.frame.bind(this));
    }
  }
}

export default View;
