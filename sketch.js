// Flocking

const flock = [];

function setup() {
  createCanvas(500, 500);
  for (let i = 0; i < 200; i++) {
    flock.push(new Boid());
  }  
}

function draw() {
  background(51);
  for (let boid of flock) {
    boid.flock(flock);
    boid.update();
    boid.show();
    boid.edges();
  }
}