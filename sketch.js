var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;
var bg;
var batman,bm;
var joker, j1;
var invisibleGround;
var obstacleGroup,obstacle1, obstacle2, obstacle3, obstacle4, obstacle5,bomb;
var gameOver,restart;

function preload(){
    bg = loadImage("images/bg.png");
    bm = loadAnimation("images/bm1.png","images/bm2.png","images/bm3.png","images/bm4.png","images/bm5.png","images/bm6.png","images/bm7.png");
    j1 = loadAnimation("images/j7.png","images/j6.png","images/j5.png","images/j4.png","images/j3.png","images/j2.png","images/j1.png");
    obstacle1 = loadImage("images/b1.png");
    obstacle2 = loadImage("images/b2.png");
    obstacle3 = loadImage("images/b3.png");
    obstacle4 = loadImage("images/b4.png");
    obstacle5 = loadImage("images/bomb.png")

}

function setup(){
    createCanvas(1000,500);
    

    night = createSprite(500,200,1000,400);
    night.addImage(bg);
    night.scale = 1.2;
    //night.velocityX = -4;
    
    joker = createSprite(950,420,20,40)
    joker.addAnimation("run",j1);
    joker.scale = 1.7;    

    batman = createSprite(60,430,20,40)
    batman.addAnimation("running",bm);
    batman.scale = 1.7;


    invisibleGround = createSprite(500,480,1000,10);
    invisibleGround.visible = false;

    obstaclesGroup = new Group();

}

function draw(){
  background(0);

  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    //night.velocityX = -(6 + 3*score/100);

  /*  night.velocityX = -4;

    if (night.x < 500) {
        night.x = 700;
    }*/

    if (keyDown("space") && batman.y >= 400) {
      batman.velocityY = -18;
    }
    batman.velocityY = batman.velocityY + 1

    spawnObstacles();
  
  }
  
  batman.collide(invisibleGround);

  drawSprites();

  textSize(20);
  fill("white");
  stroke("red");
  text("score = "+ score,800,100);
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(720,430,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              obstacle.scale = 0.4;
              break;
      case 2: obstacle.addImage(obstacle2);
              obstacle.scale = 0.5;
              break;
      case 3: obstacle.addImage(obstacle3);
              obstacle.scale = 0.5;
              break;
      case 4: obstacle.addImage(obstacle4);
              obstacle.scale = 0.4;
              break;
      case 5: obstacle.addImage(obstacle5);
              obstacle.scale = 0.3;
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           

    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
  }