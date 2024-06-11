// Falling Stars Game

// Canvas Settings
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 400;
cnv.height = 400;

// Control Variables
aPressed = false;
dPressed = false;
wPressed = false;
let score = 0;

// Game variables
let colors = ["black", "blue", "green", "orange", "red", "yellow"];

let stars = [];
for (let i = 0; i < 10; i++) {
  stars.push(createStar());
}

// Player object
let player = {
  x: cnv.width / 2 - 15, // start @ middle of width
  y: cnv.height - 30, // start @ bottom canvas
  xSpeed: 5,
  ySpeed: 0,
  w: 30,
  h: 30,
  onGround: true,
  gravity: 20,
};

// Event Handlers
document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);

function keydownHandler(event) {
  if (event.code == "KeyA") {
    aPressed = true;
  }

  if (event.code == "KeyD") {
    dPressed = true;
  }

  if (event.code == "KeyW") {
    wPressed = true;
  }
}

function keyupHandler(event) {
  if (event.code == "KeyA") {
    aPressed = false;
  }

  if (event.code == "KeyD") {
    dPressed = false;
  }
}

// Animate
requestAnimationFrame(draw);
function draw() {
  // draw background
  ctx.fillStyle = "lightgray";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // draw the score
  ctx.fillStyle = "black";
  ctx.font = "24px Arial";
  ctx.fillText(`Score: ${score}`, 10, 20);

  // player script
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.w, player.h);

  //draw all stars
  for (let i = 0; i < 10; i++) {
    ctx.drawImage(
      document.getElementById(stars[i].color),
      stars[i].x,
      stars[i].y,
      stars[i].w,
      stars[i].h
    );

    stars[i].y = stars[i].y + stars[i].ySpeed;

    //Check if star reaches bottom, then move it to the top
    if (stars[i].y >= 400) {
      stars[i].y = -40; //above canvas
      stars[i].x = randomInt(0, 360); //Random x
      stars[i].color = colors[randomInt(0, 6)]; //New colours
      stars[i].ySpeed = randomDec(1, 4);
    }

    //Check for collision with player
    if (rectCollide(player, stars[i])) {
      stars[i].y = -40; //above canvas
      stars[i].x = randomInt(0, 360); //Random x
      stars[i].color = colors[randomInt(0, 6)]; //New colours
      stars[i].ySpeed = randomDec(1, 4);
      if (stars[i].color == "red") {
        score = score - 5;
      } else if (stars[i].color == "orange" || stars[i].color == "blue") {
        score = score + 3;
      } else if (stars[i].color == "green") {
        score = score + 5;
      } else {
        score++;
      }
      if (stars[i].color == "black") {
        player.w = randomInt(10, 60);
        player.h = player.w;
      }
    }
  }

  // player control
  if (aPressed) {
    player.x = player.x - player.xSpeed;
  }

  if (dPressed) {
    player.x = player.x + player.xSpeed;
  }

  // player blocked at edges
  if (player.x <= 0) {
    player.x = 0;
  }

  if (player.x + player.w >= cnv.width) {
    player.x = cnv.width - player.w;
  }

  // player jump
  if (wPressed) {
    jump();
  }

  // stars script

  requestAnimationFrame(draw);
}
