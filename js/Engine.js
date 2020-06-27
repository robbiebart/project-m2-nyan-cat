// The engine class will only be instantiated once. It contains all the logic
// of the game relating to the interactions between the player and the
// enemy and also relating to how our enemies are created and evolve over time
class Engine {
  // The constructor has one parameter. It will refer to the DOM node that we will be adding everything to.
  // You need to provide the DOM node when you create an instance of the class
  constructor(theRoot) {
    // We need the DOM element every time we create a new enemy so we
    // store a reference to it in a property of the instance.
    this.root = theRoot;
    // We create our hamburger.
    // Please refer to Player.js for more information about what happens when you create a player
    this.player = new Player(this.root);
    // Initially, we have no enemies in the game. The enemies property refers to an array
    // that contains instances of the Enemy class
    this.enemies = [];
    // We add the background image to the game
    addBackground(this.root);
  }

  // The gameLoop will run every few milliseconds. It does several things
  //  - Updates the enemy positions
  //  - Detects a collision between the player and any enemy
  //  - Removes enemies that are too low from the enemies array
  gameLoop = () => {
    // This code is to see how much time, in milliseconds, has elapsed since the last
    // time this method was called.
    // (new Date).getTime() evaluates to the number of milliseconds since January 1st, 1970 at midnight.
    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrame;

    this.lastFrame = new Date().getTime();
    // this updates the enemy position, using the timeDiff to calculate the diff b/w the last update and this one (every 20ms) 
    // using this diff, the enemy position is updated
    this.enemies.forEach((enemy) => {
      enemy.update(timeDiff);
    });

    // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
    // We use filter to accomplish this.
    // Remember: this.enemies only contains instances of the Enemy class.
    /*
    each enemy is an object in the enemies array; each of these objects has the key destroyed, w value true(destroyed) or 
    false (not destroyed)
    */
    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });

    // We need to perform the addition of enemies until we have enough enemies.
    while (this.enemies.length < MAX_ENEMIES) {
      // We find the next available spot and, using this spot, we create an enemy.
      // We add this enemy to the enemies array
      const spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
    }

    // We check if the player is dead. If he is, we alert the user
    // and return from the method (Why is the return statement important?)
    if (this.isPlayerDead()) {
      window.alert("Game over");
      return;
    }
    /* if the player is dead, this return short circuits the gameloop before we hit the next setTime out, thus ending 
    the game by not updating its loop, which the game, cause the game loop looping is the game
    */
    // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
    setTimeout(this.gameLoop, 20);
    // this is
    // set timeout takes a callback function, and a time; when the time runs out it calls the callsback
  };

  // This method is not implemented correctly, which is why
  // the burger never dies. In your exercises you will fix this method.
  isPlayerDead = () => {
    let deadPlayer = false;
    this.enemies.forEach((enemy) => {
      if (enemy.y + ENEMY_HEIGHT > this.player.y && enemy.x === this.player.x) {
        deadPlayer = true;
      }
    });
    return deadPlayer;
    // *** here we check to see if contact is made, if else (if it's not - game not over, if it is, game over)
  };
}
// console.log('enemy.x', enemy.x);
//       console.log('this.player.x', this.player.x);
//       console.log('enemy.y', enemy.y);
//       console.log('this.player.y', this.player.y);
// This method is not implemented correctly, which is why
// the burger never dies. In your exercises you will fix this method.
// isPlayerDead = () => {
//   this.enemies.forEach((enemy) => {
//     // if (enemy.x === this.player.x && enemy.y > this.player.y)
//   }
//   console.log("hello");
// }
//   // *** here we check to see if contact is made, if else (if it's not - game not over, if it is, game over)
// };

// *** for question 1 you have to search for collection detection js, you'll eventually come across some kind of
// *** mathematical equation that's about 4 lines long, that's wht you're looking for
// collision calculates each 4 edges of player w 4 edges of enemy
/* 
First, look at the gameLoop method of the Engine. There's a part of the function that calls this.isPlayerDead() to verify if the 
player has died based on the current situation.

Next, look at the isPlayerDead method of the Engine. Notice that it's always returning false, which means that the player is 
always reported to be alive.

Here, we are going to rewrite the code of this function to actually check if the player should be dead. We will do this by 
looping over all the enemies, and checking if their box overlaps the player box.

If at least one enemy overlaps the player, then your function should return true. Otherwise it should return `false.

A good strategy would be to console.log both this.player and this.enemies. When you look in the console, you will see that 
those two objects contain the information necessary to detect a collision.
*/
