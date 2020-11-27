var trex_r, trex_c, trex, trex2, trex2image, trex2g,
ground,ground2, ground_i, ground_s,
score, gamestate,  
gameover, gameoveri, 
restart1, restarti, 
sound1, sound2, sound3, s1, s2, s3, treeImg, cut1, cut2, cut3, cut4, bgimg;

var cloudsgroup, cloudimage, obstaclesgroup, o1, o2, o3, o4, manImg;

function preload(){
  
  trex_r = loadAnimation('images/trex1.png', 'images/trex3.png', 'images/trex4.png');
  trex_c = loadAnimation('images/trex_collided.png');
  ground_s = loadImage('images/ground2.png');
  
  cloudimage = loadImage('images/cloud.png');
  /*o1 = loadImage('images/obstacle1.png');
  o2 = loadImage('images/obstacle2.png');
  o3 = loadImage('images/obstacle3.png');
  o4 = loadImage('images/obstacle4.png');
  o5 = loadImage('images/obstacle5.png');
  o6 = loadImage('images/obstacle6.png');
  */
 
  manImg = loadImage('images/man.png')
  
  gameoveri = loadImage('images/gameOver.png');
  restarti = loadImage('images/restart.png');

  s1 = loadSound('sound/jump.mp3');
  s2 = loadSound("sound/checkPoint.mp3");
  s3 = loadSound('sound/die.mp3');

  
  treeImg = loadImage('images/cut.png');

  o1 = loadImage('images/tree.png')
  o2 = loadImage('images/tree.png')
  o3 = loadImage('images/tree.png')
  o4 = loadImage('images/tree.png')

  bgimg = loadImage('images/bg.png')

  


}

function setup() {
  createCanvas(displayWidth,displayHeight-115);
  
  camera.position.x = width/2;
  camera.position.y = height/2
  
  trex = createSprite(displayWidth/2-650,displayHeight-300,50,50);
  trex.addImage(manImg);
  //trex.addAnimation("collided",trex_c);
  trex.scale = 0.25;
  trex.setCollider("rectangle",0,0,40,50);
  
  ground = createSprite(displayWidth/2,displayHeight-170,displayWidth*2,10);
  ground.addImage('ground',ground_s);
  
  ground_i = createSprite(displayWidth/2,displayHeight-195,displayWidth*2,10);
  ground_i.visible = false;
  
  cloudsgroup = new Group();
  obstaclesgroup = new Group();
  obstaclesgroup.setColliderEach("rectangle",0,0,50,100);
  cutgroup = new Group();
  
  console.log(mouseY)
  score = 0;
  gamestate = 'play'
  
  gameover = createSprite(displayWidth/2,70,75,75); 
  gameover.addImage(gameoveri);
  gameover.scale = 0.5;
  
  restart1 = createSprite(displayWidth/2,120,50,50);
  restart1.addImage(restarti);
  restart1.scale = 0.5;

  o1.scale = 0.3;
  o2.scale = 0.5;
  o3.scale = 0.6;
  o4.scale = 0.7;

  cut1 = createSprite(trex.x + 200, displayHeight-175-16 ,50,50)
   cut1.addImage(treeImg);
   cut1.scale = 1.1;

   cut2 = createSprite(trex.x + 400, displayHeight-175-16 ,50,50)
   cut2.addImage(treeImg);
   cut2.scale = 1.1;
   
   cut3 = createSprite(trex.x + 600, displayHeight-175-16 ,50,50)
   cut3.addImage(treeImg);
   cut3.scale = 1.1;
 
   cut4 = createSprite(trex.x + 800, displayHeight-175-16 ,50,50)
   cut4.addImage(treeImg);
   cut4.scale = 1.1;
  
}

function draw() {
  background(bgimg);
  
  trex.collide(ground_i);
  //obstaclesgroup.collide(ground)

  
if (gamestate == 'play'){
  
  restart1.visible = false;
  gameover.visible = false;

  cut1.visible = false;
  cut2.visible = false;
  cut3.visible = false;
  cut4.visible = false;
  
  
  ground.velocityX = -5;
  

  score = score + Math.round(getFrameRate()/60);
  textSize(18)
  fill('yellow');
  text ("Score: " + score, 50,50);  
   
  
  
    
  if (keyDown('space') && (trex.y >= displayHeight-235)){
  trex.velocityY = -15;
  s1.play();

  }
  trex.velocityY = trex.velocityY + 1;
 
   if (ground.x < displayWidth/2-300){
   ground.x = displayWidth/2; 
  }

  
  }

  if (trex.isTouching(obstaclesgroup)){
    gamestate = 'end';
    
  }
  
  spawnClouds();
  spawnobstacles();

  if (gamestate == 'end'){

   trex.velocityY = 0;
   obstaclesgroup.destroyEach(-1);
   cloudsgroup.destroyEach();
   ground.velocityX = 0;

   cut1.visible = true;
   cut2.visible = true;
   cut3.visible = true;
   cut4.visible = true;
   
   

 //trex.changeAnimation('collided', trex_c);
    
  if (mousePressedOver(restart1)){
    restart();
  }
   
    restart1.visible = true;
    gameover.visible = true;
  }
  
  drawSprites();
    
  if (gamestate == 'end'){
          
    textSize(18);
    fill('red');
    text ('Your Score: ' +score, 50, 50);

    textSize(20);
    fill('white');
    text('The tree has cut', displayWidth/2 - 75, displayHeight/2-100);

    textSize(20);
    fill('white');
    text('Save the environment by not cutting trees', displayWidth/2 - 150, displayHeight/2 + 40-100)


  }
  //console.log(mouseY)
  
}
function spawnobstacles(){

  if(World.frameCount % 60 === 0){
      var cactus = createSprite(displayWidth, displayHeight-175-45, 50, 50);
      cactus.velocityX = -7;
      
      // add random obstacles
     
      var rand = Math.round(random(1,4));
      
    switch(rand){
    case 1: cactus.addImage(o1);
    break;
    
    case 2: cactus.addImage(o2);
    break;
    
    case 3: cactus.addImage(o3);
    break;
    
    case 4: cactus.addImage(o4);
    break;
    
   }

      cactus.addImage(o1);
      cactus.scale = 0.2;
      cactus.lifetime = 300;
      obstaclesgroup.add(cactus);
      //obstaclesgroup.collide(ground_i);

  }
  }

function spawnClouds() {
  
  // To spawn the clouds after every 60th frame
 if (World.frameCount %  60 === 0 ){
      var cloud = createSprite(displayWidth,displayHeight-350,670,100,100);
      cloud.velocityX = -5;
      cloud.addImage(cloudimage);
      
      //cloud.scale = 0.7;
     
     // To make clouds appear at random heights and add lifetime to it
      
      cloud.lifetime = 200;
  
    // To adjust Trex's depth
      trex.depth = cloud.depth + 1;
      cloudsgroup.add(cloud); 
      
}
}
function restart(){

  gamestate = 'play'
  score = 0;
  trex.visible = true;
  //trex.changeAnimation('running',trex_r);

}



