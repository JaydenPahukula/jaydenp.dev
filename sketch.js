var ball = {
  x:500,
  dx:0,
  y:400,
  dy:0,
  z:0,   //0 - 140
  vx:0,
  vy:0,
  vz:0,
  ax:0,
  ay:0,
  spinAngle:0,
  spinMagnitude:0,
  history:[],
}
var game = {
  start:true,
  over:false,
  reset:false,
  resetTimer:50,
  resetTime:50,
  curve:110,
}
var player = {
  x:0,
  y:0,
  score:0,
  scoreReady:true,
  hitReady:false,
  bounce:0.5,
}
var enemy = {
  x:500,
  y:400,
  score:0,
  scoreReady:true,
  hitReady:false,
  bounce:4,
  difficulty:1,
  speed:1.4,
  speedRandom:1,
}
var mouse = {
  vx:0,
  vy:0,
  cacheX:0,
  cacheY:0,
  rollover:false,
  ready:false,
}

function setup(){
  createCanvas(1000, 800);
  rectMode(CENTER);
}

//------------------------------------------------------------------

function draw(){
  //mouse velocity
  mouse.vx = mouse.cacheX-mouseX;
  mouse.vy = mouse.cacheY-mouseY;
  mouse.cacheX = mouseX;
  mouse.cacheY = mouseY;
  
  
  
  
  
  
  
  
  //player error
  function playerError() {
    game.over = true;
    if(enemy.scoreReady == true){
      enemy.score++;
      enemy.scoreReady = false;
    }
  }
  function enemyError(){
    game.over = true;
    if(player.scoreReady == true){
      player.score++;
      player.scoreReady = false;
    }
  }
  
  
  
  
  
  
  //game start
  if(game.start == true){
    ball.x = 500;
    ball.y = 400;
    ball.vx = 0;
    ball.vy = 0;
    ball.ax = 0;
    ball.ay = 0;
    player.scoreReady = true;
    enemy.scoreReady = true;
  }
  //game over
  if(game.over == true){
    if(game.resetTimer > 0){
      game.resetTimer--;
    } else {
      game.over = false;
      game.reset = true;
      game.resetTimer = game.resetTime;
    }
    ball.vx = 0;
    ball.vy = 0;
    ball.vz = 0;
    if(ball.z > 140){
      ball.z = 140;
    }
    if(ball.z < 0){
       ball.z = 0;
    }
    ball.ax = 0;
    ball.ay = 0;
  }
  //ball reset
  if(game.reset == true){
    ball.x = 500+((ball.x-500)/1.2);
    ball.y = 400+((ball.y-400)/1.2);
    if(ball.z > 0){
      ball.z = ball.z/1.2
    }
    if(dist(ball.x,ball.y,500,400) < 0.1 && ball.z < 0.1){
      ball.x = 500;
      ball.y = 400;
      ball.z = 0;
      game.start = true;
      game.reset = false;
    }
  }
  //score reset
  function scoreReset(){
    player.score = 0;
    enemy.score = 0;
    ball.x = 500;
    ball.y = 400;
    ball.z = 0;
    game.start = true;
    game.reset = false;
    game.over = false;
  }
  if(dist(mouseX,0,900,0) < 72 && dist(0,mouseY,0,749) < 31){
    mouse.rollover = true;
  } else {
    mouse.rollover = false;
  }
  if(mouse.rollover == true && mouse.ready == true && mouseIsPressed == true){
    scoreReset();
  }
  if(mouseIsPressed == true){
    mouse.ready = false;
  } else {
    mouse.ready = true;
  }
  
  
  
  
  
  //ball curve
  ball.vx = ball.vx + ball.ax
  ball.vy = ball.vy + ball.ay
  //ball movement
  if(ball.vx > 20){
    ball.vx = 20;
  }
  if(ball.vx < -20){
    ball.vx = -20;
  }
  if(ball.vy > 20){
    ball.vy = 20;
  }
  if(ball.ay < -20){
    ball.ay = -20;
  }
  if(game.start == false && game.over == false && game.reset == false){
    ball.x = ball.x + ball.vx;
    ball.y = ball.y + ball.vy;
    ball.z = ball.z + ball.vz;
  }
  //wall hits
  if(ball.x <= 75){
    ball.vx = abs(ball.vx);
    ball.ax = ball.ax/3;
  }
  if(ball.x >= 925){
    ball.vx = -abs(ball.vx);
    ball.ax = ball.ax/3;
  }
  if(ball.y <= 175){
    ball.vy = abs(ball.vy);
    ball.ay = ball.ay/3;
  }
  if(ball.y >= 625){
    ball.vy = -abs(ball.vy);
    ball.ay = ball.ay/3;
  }
  
  
  

  
  
  
  
  //player movement
  player.x = mouseX;
  player.y = mouseY;
  if(player.x <= 164){
    player.x = 164;
  }
  if(player.x >= 836){
    player.x = 836;
  }
  if(player.y <= 194){
    player.y = 194;
  }
  if(player.y >= 606){
    player.y = 606;
  }
  //player hit
  function playerHit(){
    ball.vz = -ball.vz+0.01;
    ball.vx = ball.vx + random(-player.bounce,player.bounce);
    ball.vy = ball.vy + random(-player.bounce,player.bounce);
    if(game.start == false){
      ball.ax = mouse.vx/game.curve;
      ball.ay = mouse.vy/game.curve;
    }
    //spin limit
    if(ball.ax > 0.5){
        ball.ax = 0.5;
      }
    if(ball.ax < -0.5){
        ball.ax = -0.5;
      }
    if(ball.ay > 0.5){
        ball.ay = 0.5;
      }
    if(ball.ay < -0.5){
        ball.ay = -0.5;
      }
    if(game.start == true){
      game.start = false;
      ball.vz = 1.9;
    }
  }
  //player hit conditions
  if(dist(player.x,0,ball.x,0) <= 120 && dist(0,player.y,0,ball.y) <= 100){
    player.hitReady = true;
  } else {
    player.hitReady = false;
  }
  if(ball.z <= 0){
    if(player.hitReady == true){
      if(game.start == false){
        playerHit();
      } else {
        if(mouseIsPressed == true){
          playerHit();
        }
      }
    } else {
      if(game.start == false){
        playerError();
      }
    }
  }
  
  
  
  
  
  
  
  
  //enemy hit
  function enemyHit(){
    ball.vz = -ball.vz-0.02;
    ball.vx = (ball.vx/1.3) + random(-enemy.bounce,enemy.bounce);
    ball.vy = (ball.vy/1.3) + random(-enemy.bounce,enemy.bounce);
    ball.ax = ball.ax/10;
    ball.ay = ball.ay/10;
  }
  //enemy behavior
  if(ball.vz > 0){
    if(enemy.x < 500+(ball.x-500)/sqrt(15)){
      enemy.x = enemy.x + enemy.speed;
    }
    if(enemy.x > 500+(ball.x-500)/sqrt(15)){
      enemy.x = enemy.x - enemy.speed;
    }
    if(enemy.y < 400+(ball.y-400)/sqrt(15)){
      enemy.y = enemy.y + enemy.speed;
    }
    if(enemy.y > 400+(ball.y-400)/sqrt(15)){
      enemy.y = enemy.y - enemy.speed;
    }
  } else {
    enemy.x = 500+((enemy.x-500)*0.992);
    enemy.y = 400+((enemy.y-400)*0.992);
  }
  //enemy wall collision
  if(enemy.x <= 410){
    enemy.x = 410;
  }
  if(enemy.x >= 590.5){
    enemy.x = 590.5;
  }
  if(enemy.y <= 344.5){
    enemy.y = 344.5;
  }
  if(enemy.y >= 455){
    enemy.y = 455;
  }
  //enemy hit conditions
  if(dist(enemy.x,0,ball.dx,0) <= 32 && dist(0,enemy.y,0,ball.dy) <= 26.75){
    enemy.hitReady = true;
  } else {
    enemy.hitReady = false;
  }
  if(ball.z >= 140){
    if(enemy.hitReady == true){
      enemyHit();
    } else {
      enemyError();
    }
  }
    
  
  
  //-----------------------------------------------------------------
  
  
    
  
  //background
  background(0);
  noStroke();
  fill(0,30,0);
  rect(500,400,850,550);
  fill(0,5,0);
  rect(500,400,226.5,146);
  for(let i = 0; i < 15; i++){
    noFill();
    strokeWeight(4/i);
    stroke(0,255,0);
    rect(500,400,850/sqrt(i),550/sqrt(i));
  }
  noStroke();
  fill(0,255,0)
  triangle(387,327,75,129,78,125);
  triangle(387,473,75,673,78,676);
  triangle(614,327,922,125,926,127);
  triangle(614,473,922,676,926,673);
  
  
  
  
  
  //enemy
  strokeWeight(1.3);
  stroke(175,0,0);
  fill(175,0,0,100);
  rect(enemy.x,enemy.y,44,33.5,2);
  
  
  
  
  
  //ball display
  if(ball.x - 500 >= 0){
    ball.dx = 500+((ball.x-500)/sqrt((ball.z/10)+1));
  } else {
    ball.dx = 500-(-(ball.x-500)/sqrt((ball.z/10)+1));
  }
  if(ball.y - 400 >= 0){
    ball.dy = 400+((ball.y-400)/sqrt((ball.z/10)+1));
  } else { 
    ball.dy = 400-(-(ball.y-400)/sqrt((ball.z/10)+1));
  }
  //ball
  noStroke();
  fill(255,255,0);
  if(game.over == true || game.reset == true){
    strokeWeight(7/sqrt((ball.z/10)+1));
    stroke(255,255,0,200);
    fill(255,255,0,60);
  }
  angleMode(DEGREES);
  let v1 = createVector((ball.ax)+0.00001,(ball.ay));
  let v2 = createVector(1,0);
  ball.spinAngle = v2.angleBetween(v1);
  ball.spinMagnitude = sqrt(sq(ball.ax)+sq(ball.ay));
  translate(ball.dx,ball.dy);
  rotate(ball.spinAngle+90);
  ellipse(0,0,80/sqrt((ball.z/10)+1),((ball.spinMagnitude*0.5)+1)*(80/sqrt((ball.z/10)+1)));
  rotate(-(ball.spinAngle+90));
  translate(-ball.dx,-ball.dy);
  
  //ball trail
  if(game.over == false && game.reset == false && game.start == false){
    var v = createVector(ball.dx,ball.dy)
    ball.history.push(v);
  }
  
  noStroke();
  fill(255,0,0);
  for (let i = 0; i < ball.history.length; i++) {
    var pos = createVector(ball.history[49-i]);
    ellipse(pos.x,pos.y,10,10);
  }
  if(ball.history.length > 50){
    ball.history.splice(0,1);
  }
  
  
  
  
  
  
  //marker
  noFill();
  strokeWeight(1.5/sqrt((ball.z/10)+1));
  stroke(255,255,0);
  rect(500,400,850/sqrt((ball.z/10)+1),550/sqrt((ball.z/10)+1));
  strokeWeight(4);
  stroke(0,255,0);
  rect(500,400,850,550);
  
  
  
  //player
  strokeWeight(5);
  stroke(0,160,255);
  fill(0,160,255,100);
  rect(player.x,player.y,170,130,8);
  line(player.x+15,player.y,player.x-15,player.y);
  line(player.x,player.y+15,player.x,player.y-15);
  
  
  
  //reset button
  strokeWeight(5);
  stroke(255,0,0);
  fill(255,0,0,30);
  if(mouse.rollover == true){
    fill(255,0,0,90);
  }
  rect(900,749,140,58,6);
  
  
  
  
  //text
  textAlign(CENTER,CENTER);
  textSize(130);
  fill(0,255,0);
  noStroke();
  text("CURVEBALL",500,52);
  textSize(130);
  fill(0,160,255);
  textAlign(RIGHT,CENTER);
  text(player.score,490,726);
  fill(255,0,0);
  textAlign(LEFT,CENTER);
  text(enemy.score,510,726);
  fill(255,0,0);
  textAlign(CENTER,CENTER);
  textSize(45);
  text("RESET",901,746);
  if(game.start == true && player.score == 0 && enemy.score == 0){
    fill(255,255,0);
    textSize(46);
    text("CLICK THE BALL TO SERVE",500,630);
  }
  
  
  
  
}