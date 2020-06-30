// There will only be one instance of this class. This instance will contain the
// data and methods related to the burger that moves at the bottom of your screen
class Player {
  // The constructor takes one parameter. This parameter refers to the parent DOM node.
  // We will be adding a DOM element to this parent DOM node.
  constructor(root) {
    // The x position starts off in the middle of the screen. Since this data is needed every time we move the player, we
    // store the data in a property of the instance. It represents the distance from the left margin of the browsing area to
    // the leftmost x position of the image.
    this.x = 2 * PLAYER_WIDTH;
    this.root = root;

    // The y position never changes, so we don't need to store it in a property. It represents the y position of the top of the
    // hamburger. The y position is the distance from the top margin of the browsing area.
    this.y = GAME_HEIGHT - PLAYER_HEIGHT - 10;

    this.bullets = [];

    // We create a DOM node. We will be updating the DOM node every time we move the player, so we store a reference to the
    // DOM node in a property.
    this.domElement = document.createElement('img');
    this.domElement.src = 'images/player.png';
    this.domElement.style.position = 'absolute';
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = ` ${this.y}px`;
    this.domElement.style.zIndex = '10';
    root.appendChild(this.domElement);
  }

  // This method will be called when the user presses the left key. See in Engine.js
  // how we relate the key presses to this method
  moveLeft() {
    if (this.x > 0) {
      this.x = this.x - PLAYER_WIDTH;
    }

    this.domElement.style.left = `${this.x}px`;
  }

  // We do the same thing for the right key. See Engine.js to see when this happens.
  moveRight() {
    if (this.x + PLAYER_WIDTH < GAME_WIDTH) {
      this.x = this.x + PLAYER_WIDTH;
    }
    this.domElement.style.left = `${this.x}px`;
  }
  shootBullet() {
    const spot = this;
    this.bullets.push(new Bullet(this.root, spot));
  }


  // let bulletTimeDiff = this.bulletTimeDifference();

  updateBulletPosition = (TimeDiff) => {
    this.bullets.forEach((bullet) => {
      bullet.bulletUpdate(TimeDiff);
    });
  };

  filterDestroyedBullets = () => {
    this.bullets = this.bullets.filter((bullet) => {
      return !bullet.destroyed;
    });
  };

  

//   bulletUpdate(timeDiff) {
//     // We update the y property of the instance in proportion of the amount of time
//     // since the last call to update. We also update the top css property so that the image
//     // is updated on screen
//     this.y = this.y + timeDiff * this.speed;
//     this.domElement.style.top = `${this.y}px`;

//     // If the y position of the DOM element is greater than the GAME_HEIGHT then the enemy is at the bottom
//     // of the screen and should be removed. We remove the DOM element from the root DOM element and we set
//     // the destroyed property to indicate that the enemy should no longer be in play
//     if (this.y > GAME_HEIGHT - PLAYER_HEIGHT) {
//       this.root.removeChild(this.domElement);

//       this.destroyed = true;
//     }
//   }
// }
// when the spacebar is hit, can call a method in the player right away,
//  shoot bullet creates a new instance of the bullet class, adn then once you have that
//  yhou just keep updating the players bullet every 20ms 

// get an array of bullets, so it's very similar to managing the enemies inside the game engine,
// you have the array of existing bullets, call a method on the player that updates any bullets that exist
// in the array on the screen, destroy bullets above the screen, and something to filter out destroyed bullets
// opposite of update function for enemies (when it passes the top), instead of increasing y you decrease it so 
// it moves up, 

// for maintaining the bullet array (look in engine class) we have methods for filtering out 
// destroyed enemies, and for updating all the enemies in the enemies array, so just reuse those 
// by copy pasting them into the player class and refactor them to work for bullets 
// num just get it so when you hit spacebar bullet is on screen, then try to figure out
// a way (just like enemies move down) update the bullet so it moves up the screen, exactly like updateEnemies
// method, and then collision detecting between bullets and enemies




}
