// Flocking

const flock = [];
let obstacle;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  obstacle = new Obstacle(width/2,height/2);
  for (let i = 0; i < 200; i++) {
    flock.push(new Boid());
  }  
}

function draw() {
  background(30); //comment out for cool effect
  obstacle.show();
  obstacle.setPosition(mouseX, mouseY);
  for (let boid of flock) {
    boid.flock(flock);
    boid.update();
    boid.show();
    boid.edges();
    boid.check(obstacle);
  }
}