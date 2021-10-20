class Obstacle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.r = 50;
    }
  
    show() {
      fill(0, 0, 0, 0);
      stroke(255);
      //point(this.x, this.y, this.r);
      line(mouseX, mouseY, pmouseX, pmouseY);
    }
    
    setPosition(x, y) {
     this.x = x;
      this.y = y;
    }
  }