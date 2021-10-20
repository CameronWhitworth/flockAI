// Flocking

class Boid {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(2, 5));
    this.acceleration = createVector();
    this.maxForce = 0.2;
    this.maxSpeed = 10;
    this.color = {r : random(50, 100), g : random(100, 255), b : random(150, 200)};
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

  cohesion(boids) {
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
        steering.add(i.position);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.sub(this.position);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  separation(boids) {
    let perception = 80;
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
        let diff = p5.Vector.sub(this.position, i.position);
        diff.div(d);
        steering.add(diff);
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
    let cohesion = this.cohesion(boids);
    let separation = this.separation(boids);
    this.acceleration.add(separation);
    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);
  }

  edges() {
    if (this.position.x > width) {
      this.position.x = 0;
    }
    else if (this.position.x < 0) {
      this.position.x = width;
    }

    if (this.position.y > height) {
      this.position.y = 0;
    }
    else if (this.position.y < 0) {
      this.position.y = height;
    }
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
  }

  show() {
    stroke(this.color.r, this.color.g, this.color.b);
    strokeWeight(2);
    fill(this.color.r, this.color.g, this.color.b);
    push();
    translate(this.position.x, this.position.y);
    rotate(this.velocity.heading());
    triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0);
    pop();
  }
}
