/* VARIABLES */
let catcher, fallingObject, asteroid;
let score = 0;
let startButton, retstartButton, playAgainButton;
let showInstructions = false;
let showRules = false;
let backgroundImg, catcherImg, fallingobjectImg, asteroidImg, skyImg, rocket1Img, rocket2Img, earthImg, heartImg;

/* PRELOAD */
function preload(){
fallingobjectImg = loadImage("assets/star.png");
asteroidImg = loadImage("assets/asteroid.png");
skyImg = loadImage("assets/star.jpg");
backgroundImg = loadImage("assets/first.jpg");
heartImg = loadImage("assets/heart.png");
catcherImg = loadImage("assets/astro.png");
rocket1Img = loadImage("assets/rocketb.png");
rocket2Img = loadImage("assets/rocketlev.png");
earthImg = loadImage("assets/earth.jpg");
}

/* SETUP */
function setup() {
  createCanvas(500,400);

  //Resize
  fallingobjectImg.resize(30, 30);
  asteroidImg.resize(30, 30);
  backgroundImg.resize(500, 400);
  heartImg.resize(28, 28);
  catcherImg.resize(90,85); 
  rocket1Img.resize(70,95);
  rocket2Img.resize(80,95);

  //Sprites
  catcher = new Sprite(catcherImg, 120,370,50,50, "k");

  rocket = new Sprite(rocket1Img, 50, 350, 50, 100, "k");

  rocketlev = new Sprite(rocket2Img, -50, -350, 50, 100, "k");
  
  fallingObject = new Sprite(fallingobjectImg, -100,0,10);
  fallingObject.rotationLock = true;

  asteroid = new Sprite(asteroidImg, -100, 0, 10);
  asteroid.color = color("red");
  asteroid.rotationLock = true;

  startButton = new Sprite(400 , 350);
  startButton.w = 100;
  startButton.h = 50;
  startButton.collider = 'k';
  startButton.color = 'red';
  startButton.text = 'START'
  startButton.textSize = 15;
  startButton.stroke = 7;

  restartButton = new Sprite(width/2 , height/2 + 100);
  restartButton.pos = {x: -190, y:-190};

  playAgainButton = new Sprite(width/2 , height/2 + 100);
  playAgainButton.pos = { x: -100, y: - 100};

  heart1 = new Sprite(heartImg, -25, 13, 10, "none");
  heart2 = new Sprite(heartImg, -50, 13, 10, "none");
  heart3 = new Sprite(heartImg, -75, 13, 10, "none");
  
}
/* DRAW LOOP REPEATS */
function draw() {
    background(backgroundImg);
  textSize(20);
  noStroke();
  fill('white')
  textFont("Courier");
  text("An astronaut is trapped on a foreign \nplanet. Help her collect 10 stars \nto fuel her spaceship back to earth.",
    50, 240);

  

      //If fallingObjects reach bottom, move back to random position at top
  if (fallingObject.y >= height) {
    fallingObject.y = 0;
    fallingObject.x = random(width);
    fallingObject.vel.y = random(1,5);
  }
   
    if (asteroid.y >= height) {
    asteroid.y = 0;
    asteroid.x = random(width);
    asteroid.vel.y = random(1,5);
  }

  //Move catcher
  if (kb.pressing("left")) {
    catcher.vel.x = -3;
  } else if (kb.pressing("right")) {
    catcher.vel.x = 3;
  } else {
    catcher.vel.x = 0;
  }

  //Stop catcher at edges of screen
  if (catcher.x < 50) {
    catcher.x = 50;
  } else if (catcher.x > 450) {
    catcher.x = 450;
  }
  
  // If fallingObjects collide with catcher, move back to random position at top
  if (fallingObject.collides(catcher)) {
    fallingObject.y = 0;
    fallingObject.x = random(width);
    fallingObject.vel.y = random(1,5);
    fallingObject.direction = "down";
    score = score + 1;
  }

    if (asteroid.collides(catcher)){
    asteroid.y = 0;
  asteroid.x = random(width);
    asteroid.vel.y = random(1,5);
    asteroid.direction = "down";
    score = score - 1;
  }
  
    if (score < -2){
      showInstructions = true;
      showRules = true;
    catcher.pos = {x: -200, y: -200};
    fallingObject.pos = {x: -150, y: -150};
    asteroid.pos = {x: -100, y: -100};
  restartButton.pos = {x: 250, y:300};
  restartButton.w = 150;
  restartButton.h = 50;
  restartButton.collider = 'k';
  restartButton.color = 'red';
  restartButton.text = 'TRY AGAIN';
  restartButton.textSize = 17;
  restartButton.stroke = 7;

      if (restartButton.mouse.presses()) {
            score = 0;
    showRules = false;
        
    fallingObject.pos = { x: -100, y: 0 };
    fallingObject.vel.y = random(1, 5);

    asteroid.pos = { x: -100, y: 0 };
    asteroid.vel.y = random(1, 5);

    catcher.pos = { x: 200, y: 370 };
    restartButton.pos = { x: -190, y: -190 };
  }
    }

  if (score >= 10){
    showInstructions = false;
    background(earthImg);
    textFont("Andale Mono");
  text("You helped the \nastronaut escape!", 290, 200)
  catcher.pos = {x: -200, y: -200};
  rocketlev.pos = {x: 150, y: 200};
  rocket.pos = {x: -340, y:-180};
  fallingObject.pos = {x: -150, y: -150};
  asteroid.pos = {x: -100, y: -100};
  playAgainButton.pos = {x: 400, y: 350};
  heart1.pos = {x: -25, y:-13};
  heart2.pos = {x:-50, y:-13};
  heart3.pos = {x:-75, y:-13};
  playAgainButton.w = 120;
  playAgainButton.h = 50;
  playAgainButton.collider = 'k';
  playAgainButton.color = 'red';
  playAgainButton.text = 'PLAY AGAIN';
  playAgainButton.textSize = 17;
  playAgainButton.stroke = 7;
    if (playAgainButton.mouse.presses()) {
            score = 0;
    rocketlev.pos = {x: -120, y:-120};
    showInstructions = true;

    fallingObject.pos = { x: -100, y: 0 };
    fallingObject.vel.y = random(1, 5);

    asteroid.pos = { x: -100, y: 0 };
    asteroid.vel.y = random(1, 5);

    catcher.pos = { x: 200, y: 370 };
    playAgainButton.pos = { x: -190, y: -190 };
          }

  }
  if (startButton.mouse.presses()) {

  startButton.pos = { x: -100, y: - 100};
    
  fallingObject.pos = {x: 100, y: 0};
  fallingObject.vel.y = 2;

  asteroid.pos = {x: 100, y: 0};
  asteroid.vel.y = 2;

  rocket.pos = {x: -90, y: -90};

  catcher.pos = {x: 200, y: 370};
  screen = 1;
    showInstructions = true;
  }

  if (showInstructions) {
    // Show instructions and score
    background(skyImg);
    fill("white");
    textSize(12);
    textFont("Courier");
    text(
      "Move the astronaut \nwith the left and right \narrow keys to catch \nthe falling stars and \navoid the asteroids",
      width - 170,
      20
    );

    fill("yellow");
    textSize(17);
    text("Stars = " + score, 17, 37);

  heart1.pos = {x: 25, y:13};
  heart2.pos = {x:50, y:13};
  heart3.pos = {x:75, y:13}; }

  if (showRules){
    fill("white");
    text("Each star collected increases the star score by \n1\nEach asteroid collected decreases the star \nscore by 1", 10,130);
  }

  function keyPressed() {
  if (keyCode === 82) { // 'R' key
    showRules = !showRules;
  }
} 
}