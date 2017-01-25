import Player from './player';
import Shape from './shape';
import { CANVAS_WIDTH,
         CANVAS_HEIGHT,
         CENTER_RADIUS,
         BALL_RADIUS,
         SHAPE_SHRINK_RATE } from './vars';

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.player = new Player();
    this.shapes = [];
    this.count = 0;
    this.gameOver = false;
  }

  generateShape() {
    const shape = new Shape();
    this.shapes.push(shape);
  }

  handleCollision() {
    this.shapes.forEach(shape => {
      if (shape.handleCollision(this.player)) {
        this.gameOver = true;
      }
    });
  }

  remove() {
    this.shapes.forEach(shape => {
      if (shape.radius < CENTER_RADIUS) {
        this.shapes.splice(this.shapes.indexOf(shape), 1);
        this.count += 1;
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.shapes.forEach(shape => {
      shape.draw(this.ctx);
      shape.shrink(SHAPE_SHRINK_RATE);
      shape.rotate();
    });
    this.player.draw(this.ctx);
  }

  tick() {
    this.draw();
    this.handleCollision();
    this.remove();
    if (this.player.clockwise) {
      this.player.handleMove(1);
    } else {
      this.player.handleMove(-1);
    }
  }

}

export default Game;
