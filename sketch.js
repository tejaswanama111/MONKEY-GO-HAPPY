var PLAY=1;
var END=0;
var gameState =1;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup;
var obstacleGroup;
var score; 
var count;
var gameOver;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkey_collided = ("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  gameOverImg = loadImage("gameover.png");
  
 
}

function setup() {
  createCanvas(800,500);
  
  monkey = createSprite(100,380,20,50);
  monkey.addAnimation("monkey", monkey_running);
   monkey.addAnimation("collided", monkey_collided);
  monkey.scale = 0.2;

  ground = createSprite(400,450,1600,10);

  ground.x = ground.width/2;
  
  gameOver = createSprite(380,190);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 3;
  gameOver.visible = false;
  
  
  
 count= 0;
 var score= 0;
 
   bananaGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
 background(220);
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time : "+ score, 600,50);
  
  
   stroke("black");
   textSize(20);
   text("Bananas :"+ count,40,50);
  
  
  if(gameState===PLAY) {

       if (ground.x < 0){
        ground.x = ground.width/2;
       }
    
    score = Math.ceil(frameCount/frameRate());

    ground.velocityX = -4;

     if(keyDown("space")&& monkey.y >= 380) {
          monkey.velocityY = -12;
      }

      //add gravity
      monkey.velocityY = monkey.velocityY + 0.4;

    if(bananaGroup.isTouching(monkey)) {
      count = count+1;
      bananaGroup.destroyEach(); 
    }
       
     bananas();
     obstacles();
  
   monkey.collide(ground);
  
  if(obstacleGroup.isTouching(monkey)) {
    gameState = END;
  }
  }
  
  else if(gameState===END) {
    
     gameOver.visible = true;
    
    ground.velocityX = 0;
    monkey.velocityY = 0;
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    monkey.changeAnimation("collided", monkey_collided);
  }
     
  drawSprites();
}

function bananas() {
  if(frameCount %80===0) {
    
    banana = createSprite(800,220,20,20);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.y = Math.round(random(200,250));
    banana.lifetime = 200;
    banana.velocityX = -4;
    
    bananaGroup.add(banana);
  }
}

function obstacles() {
  if(frameCount %300 ===0) {
    
    obstacle = createSprite(800,412,30,30);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.x = Math.round(random(800,700));
    obstacle.lifetime = 133;
  
    obstacle.velocityX = -6;
    
    obstacleGroup.add(obstacle);
  }
}