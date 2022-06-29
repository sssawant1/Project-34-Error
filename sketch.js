const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg,tank;
var canvas, angle, ground, fighterPlane;
var balls = [];
var tanks = [];

function preload() {
  backgroundImg = loadImage("./assets/battlezone.webp");
  
}

function setup() {
  canvas = createCanvas(2000, 900);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  angle = 15

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);


  cannon = new Cannon(180, 110, 130, 100, angle);
 
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);
  
  push();
  translate(ground.position.x,ground.position.y);

  fill("brown");
  rectMode(CENTER);
  //the width is the ground width for the line below
  rect(0,0,width*2,1);
  pop();
 
  //line 49 is replaced by line 45 by using push and pop function
 // rect(ground.position.x, ground.position.y, width * 2, 1);
  

  


  showTanks();

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
    //index is used to access the array elements, the 0 starts from 0 to balls.length
    collisionWithTank(i);

  }

 cannon.display();
}

function collisionWithTank(index){
  for(var i=0; i <tanks.length; i++) {
    if(balls[index] !== undefined && tanks[i]!== undefined) {
      var collision =Matter.SAT.collides(balls[index].body,tanks[i].body);

      if(collision.collided) {
        tanks[i].remove(i);
        Matter.World.remove(world,balls[index].body);
        delete balls[index];

      }
    } 
  }
}



function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball, index) {
  if (ball) {
    ball.display();
    if(ball.body.position.x >= width || ball.body.position.y >= height -50){
      ball.remove(index);
      
    }
  }
}

function showTanks() {
  if (tanks.length > 0) {
    if (
      tanks[tanks.length - 1] === undefined ||
      tanks[tanks.length - 1].body.position.x < width - 300
    ) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      var tanks = new Tank(width, height - 100, 170, 170, position);

      tanks.push(tank);
    }

    for (var i = 0; i < tanks.length; i++) {
      if (tanks[i]) {
        Matter.Body.setVelocity(tanks[i].body, {
          x: -0.9,
          y: 0
        });

        tanks[i].display();
      } 
    }
  } else {
    var tank = new Tank(width, height - 60, 170, 170, -60);
    tanks.push(tank);
  }
} 

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}


