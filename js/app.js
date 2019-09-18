// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed*dt;
    this.x = this.x>500?0:this.x;
    this.detectCrash();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.detectCrash = function() {
    if (player.x + 26 <= this.x + 90 && player.x + 77 >= this.x + 10 && player.y + 130 >= this.y + 92 && player.y + 72 <= this.y + 132) {
        restartGame();
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};
Player.prototype.update = function(x, y) {

};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 410;
    this.speed = 90;
};
Player.prototype.handleInput = function (pressedKey) {
    switch (pressedKey) {
        case 'up':
            if (this.y == -40) {
                this.y = -40;
            } else {
                this.y -= this.speed;
            }
            break;
        case 'down':
            if (this.y == 410) {
                this.y = 410;
            } else {
                this.y += this.speed;
            }
            break;
        case 'right':
            if (this.x == 380) {
                this.x = 380;
            } else {
                this.x += this.speed;
            }
            break;
        case 'left':
            if (this.x == 20) {
                this.x = 20;
            } else {
                this.x -= this.speed;
            }
            break;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(0, 0, 0);// values doesn't matter, change in reset function


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function restartGame() {
    player.reset();
    allEnemies = [];
    allEnemies.push(
        new Enemy(0,40 + Math.random()*0,40 + Math.random()*100),
        new Enemy(0,60 + Math.random()*250 ,60 + Math.random()*100),
        new Enemy(5,50 + Math.random()*280,70 + Math.random()*100),
        new Enemy(5,50 + Math.random()*300,70 + Math.random()*100),
        );
}
restartGame();