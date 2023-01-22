const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var ground,rope,fruit;
var fruit_con;
var bg_image,food,bunnyImg,bunny,button;

function preload(){
  bg_image = loadImage("background.png");
  bunnyImg = loadImage("Rabbit-01.png");
  food = loadImage("melon.png");
}

function setup() {
  createCanvas(600,700);
  
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(300,690,600,20)
  rope = new Rope(8,{x:300,y:10});
  fruit = Bodies.circle(300,300,30);
  Matter.Composite.add(rope.body,fruit);
  fruit_con = new Link(rope,fruit);

  bunny = createSprite(300,600,50,50)
  bunny.addImage(bunnyImg)
  bunny.scale = 0.25;
  
  button = createImg("cut_btn.png");
  button.position(280,10);
  button.size(50,50)
  button.mouseClicked(drop);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
}

function draw() {
  background(51);
  image(bg_image,0,0,width,height)
  
  Engine.update(engine);
  ground.show();
  rope.show();
  
  push();
  
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,100,100)
  }
  pop();
  drawSprites();
}

function drop(){
  rope.break();
  fruit_con.detach();
  fruit_con = null;
}

