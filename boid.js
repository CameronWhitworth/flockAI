// Flocking

class Boid {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(2, 5));
    this.acceleration = createVector();
    this.maxForce = 0.2;
    this.maxSpeed = 5;
    this.r = 16;
  }

  align(boids) {
    let perception = 100;
    let steering = createVector();
    let total = 0;
    for (let i of boids) {
      let d = dist(
        this.position.x,
        this.position.y,
        i.position.x,
        i.position.y
      );
      if (i != this && d < perception) {
        steering.add(i.velocity);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  flock(boids) {
    let alignment = this.align(boids);
    this.acceleration = alignment;
  }

  edges() {
    if (this.position.x > width) {
      this.position.x = 0;
    }
    else if (this.position.x < 0) {
      this.position.x = width;
    }

    if (this.position.y > width) {
      this.position.y = 0;
    }
    else if (this.position.y < 0) {
      this.position.y = width;
    }
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
  }

  show() {
    stroke(255);
    strokeWeight(2);
    fill(255);
    push();
    translate(this.position.x, this.position.y);
    rotate(this.velocity.heading());
    triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0);
    pop();
  }
}
