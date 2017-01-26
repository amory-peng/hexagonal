import { SHAPE_ANGLE_CHANGE,
         SHAPE_STARTING_RADIUS,
         CANVAS_HEIGHT,
         CANVAS_WIDTH,
         BALL_RADIUS,
         STARTING_ANGLES,
         ARC_LENGTHS } from './vars';

class Shape {
  constructor() {
    this.radius = SHAPE_STARTING_RADIUS;
    this.clockwise = Math.random() > 0.5 ? true : false;
    this.color = 'white';
    this.generateStartAngles();
  }

  generateStartAngles() {
    const select = Math.floor(Math.random() * STARTING_ANGLES.length);
    this.arcLength = ARC_LENGTHS[select];
    let selectAngles = STARTING_ANGLES[select];
    const delta = Math.random() * 360;
    selectAngles = selectAngles.map( angle => {
      return this.handleMove(angle + delta);
    });
    this.startAngles = selectAngles;
  }

  draw(ctx) {
    this.startAngles.forEach( startAngle => {
      ctx.beginPath();
      ctx.arc(CANVAS_WIDTH/2, CANVAS_HEIGHT/2, this.radius,
        startAngle * Math.PI/180,
        (startAngle + this.arcLength) * Math.PI/180);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 7;
        ctx.stroke();
    });
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

  handleCollision(other) {
    let collision = false;
    this.startAngles.forEach( startAngle => {
      if (other.radius - BALL_RADIUS <= this.radius &&
        other.radius + BALL_RADIUS >= this.radius) {
          let end = startAngle + this.arcLength;
          let start = startAngle;
          if (start >= 360 || end >= 360) {
            end -= 360;
            start -= 360;
          }
          if (other.angle > start && other.angle < end ||
            other.angle - 360 > start && other.angle - 360 < end ||
            other.angle + 360 > start && other.angle + 360 < end) {
              collision = true;
            }
          }
    });
    return collision;
  }

  rotate() {
    this.startAngles = this.startAngles.map( startAngle => {
      if (this.clockwise) {
        startAngle = this.handleMove(startAngle + SHAPE_ANGLE_CHANGE);
      } else {
        startAngle = this.handleMove(startAngle - SHAPE_ANGLE_CHANGE);
      }
      return startAngle;
    });
  }
}

export default Shape;
