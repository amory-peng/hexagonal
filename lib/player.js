import { CANVAS_HEIGHT,
         CANVAS_WIDTH,
         BALL_RADIUS,
         CENTER_RADIUS } from './vars';

class Player {
  constructor() {
    this.angle = 0;
    this.radius = 50;
    this.clockwise = true;
  }

  handleMove(delta) {
    if (delta > 0) {
      this.clockwise = true;
    } else {
      this.clockwise = false;
    }
    if (this.angle + delta > 360) {
      this.angle = delta;
    } else if (this.angle + delta < 0) {
      this.angle = 360 + delta;
    } else {
      this.angle += delta;
    }
  }

  getPos() {
    const x = CANVAS_WIDTH/2 +
      this.radius * Math.cos( Math.PI * this.angle / 180);
    const y = CANVAS_HEIGHT/2 +
      this.radius * Math.sin( Math.PI * this.angle / 180);
    return [x,y];
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(
      this.getPos()[0], this.getPos()[1], BALL_RADIUS, 0, 2 * Math.PI
    );
    ctx.fillStyle = 'red';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(
      CANVAS_WIDTH/2, CANVAS_HEIGHT/2, CENTER_RADIUS, 0, 2 * Math.PI
    );
    ctx.fillStyle = 'black';
    ctx.fill();
  }
}

export default Player;
