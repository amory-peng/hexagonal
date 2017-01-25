import { SHAPE_ANGLE_CHANGE,
         SHAPE_STARTING_RADIUS,
         CANVAS_HEIGHT,
         CANVAS_WIDTH } from './vars';

class Shape {
  constructor() {
    this.radius = SHAPE_STARTING_RADIUS;
    this.startAngle = this.handleMove(Math.random() * 360);
    this.arcLength = 180;
    this.clockwise = Math.random() > 0.5 ? true : false;
    this.color = 'white';
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(CANVAS_WIDTH/2, CANVAS_HEIGHT/2, this.radius,
       this.startAngle * Math.PI/180,
       (this.startAngle + this.arcLength) * Math.PI/180);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 10;
    ctx.stroke();
  }

  shrink(num) {
    this.radius -= num;
  }

  handleMove(angle) {
    if (angle > 360) {
      angle -= 360;
    } else if (angle < 0) {
      angle += 360;
    }
    return angle;
  }

  rotate() {
    if (this.clockwise) {
      this.startAngle = this.handleMove(this.startAngle + SHAPE_ANGLE_CHANGE);
    } else {
      this.startAngle = this.handleMove(this.startAngle - SHAPE_ANGLE_CHANGE);
    }
  }
}

export default Shape;
