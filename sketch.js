var Monkey, Banana, Obstacle, Jungle, ObstaclesGroup, BananaGroup, PLAY = 1, END = 0, back, monkeey, gameState = PLAY


function preload()
{
Monkey = loadAnimation ("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
Banana = loadAnimation("banana.png", "banana-1.png");
Obstacle = loadImage("obstacle.png");
Jungle = loadImage("jungle.jpg");
}

function setup()
{
  createCanvas(600,600)
  back = createSprite(600,185);
  back.addImage("backk",Jungle);
  back.velocityX = -4;
  back.scale = 1.5;
 
  monkeey = createSprite(50,600);
  monkeey.addAnimation("monkee",Monkey);
  monkeey.scale = 0.2;
  
  
  
  ObstaclesGroup = createGroup();
  BananaGroup = createGroup();
  
  score = 0;
  
  
  
}

function draw()
{
  background(255)
  text("Score: "+ score, 520, 35);
  edges = createEdgeSprites();
    back.velocityX = -(6 + 3*score/100);
    score = score+Math.round(getFrameRate()/60);
    
    if (back.x < 0){
      back.x = back.width/2;
    }
    
    if(keyDown("space") && monkeey.y >=150){
      monkeey.velocityY = -12 ;
    }

    monkeey.velocityY = monkeey.velocityY + 0.8;
    
    bananas();
  
    obstacles();
    
  monkeey.collide(edges[3]);
  
  if(BananaGroup.isTouching(monkeey)){
    monkeey.scale = monkeey.scale+0.1;
  }
  switch(score){
    case 10: monkeey.scale = 0.12;
    break;
    case 20: monkeey.scale = 0.14;
    break;
    case 30: monkeey.scale = 0.16;
    break;
    case 40: monkeey  .scale = 0.18;
    break;
    default: break;
  }
  
  if(monkeey.isTouching(ObstaclesGroup)){
    monkeey.scale = 0.2;
  }
  
  drawSprites();


   }

function obstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(600,550,10,40);
    obstacle.velocityX = -6
    obstacle.addImage ("obstaclee", Obstacle);
         
    obstacle.scale = 0.2;
    obstacle.lifetime = 100;
    
    ObstaclesGroup.add(obstacle);
  }
}

function bananas() {
  if (World.frameCount % 60 === 0) {
    var bananas = createSprite(600,104130,40,10);
    bananas.y = Math.round(random(10,300));
    bananas.addAnimation("banananana",Banana);
    bananas.scale = 0.1;
    bananas.velocityX = -3;
    
    bananas.lifetime = 200;

    bananas.depth = monkeey.depth;
    monkeey.depth = monkeey.depth + 1;
    
    BananaGroup.add(bananas);
  }
  
}

 