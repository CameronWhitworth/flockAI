// Flocking

const flock = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  for (let i = 0; i < 200; i++) {
    flock.push(new Boid());
  }  
}

function draw() {
  background(30); //comment out for cool effect
  for (let boid of flock) {
    boid.flock(flock);
    boid.update();
    boid.show();
    boid.edges();
  }
}