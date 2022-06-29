class Tank {
    constructor(x, y, width, height, tankPos) {
    
      this.body = Bodies.rectangle(x, y, width, height);
      this.width = width;
      this.height = height;
  
      this.image = loadImage("./assets/tank.png");
      this.tankPosition = tankPos;
      World.add(world, this.body);
    }
  
    remove(index){
      setTimeout(()=>{
         Matter.World.remove(world,tanks[index].body);
         delete tanks[index];
  
      },2000);
    }
  
    display() {
      var angle = this.body.angle;
      var pos = this.body.position;
  
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      imageMode(CENTER);
      image(this.image, 0, this.tankPosition, this.width, this.height);
      pop();
    }
  }
  