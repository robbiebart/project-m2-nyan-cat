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

    this.startTime = new Date().getTime();

    this.score = 0;

    this.text = new Text(this.root, 50, 50);
    // We add the background image to the game
    addBackground(this.root);
  }

  // The gameLoop will run every few milliseconds. It does several things
  //  - Updates the enemy positions
  //  - Detects a collision between the player and any enemy
  //  - Removes enemies that are too low from the enemies array

  calcTimeDifference = () => {
    let currentTime = new Date().getTime();

    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }
    let timeDiff = currentTime - this.lastFrame;
    this.lastFrame = currentTime;

    return timeDiff;
  };

  updateEnemyPosition = (timeDiff) => {
    this.enemies.forEach((enemy) => {
      enemy.update(timeDiff);
    });
  };
  /*
  each enemy is an object in the enemies array; each of these objects has the key destroyed, w value true(destroyed) or 
  false (not destroyed)
  */
  filterDestroyedEnemies = () => {
    this.enemies = this.enemies.filter((enemy) => {
      if (enemy.destroyed === true) {
        this.score += 100;
      }
      return !enemy.destroyed;
    });
  };
  /*
    each enemy is an object in the enemies array; each of these objects has the key destroyed, w value true(destroyed) or 
    false (not destroyed)
    */
  addEnemies = () => {
    while (this.enemies.length < MAX_ENEMIES) {
      const spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
    }
  };

  checkIfDeadOrContinue = () => {
    if (this.isPlayerDead()) {
      const gameOver = new Text(this.root, GAME_WIDTH / 2, GAME_HEIGHT / 2);
      // console.log(gameOver);
      gameOver.update("GG NO RE");

      return;
    } else {
      this.continueGame();
    }
  };

  // checkIfEnemyHit = () => {
  //   if (this.isEnemyDead()) {
  //     (enemy.destroyed === true) {
  //       this.score += 100;
  //     }
  //     return !enemy.destroyed;
  //   }
  // }

  continueGame = () => {
    setTimeout(this.gameLoop, 20);
  };

  scoreCounter = () => {
    let gameTime = new Date().getTime() - this.startTime;
    let finalScore = Math.floor(gameTime / 100 + this.score);
    // if (thisenemy.y + ENEMY_HEIGHT > this.player.y && enemy.x !== this.player.x) {
    //   this.score + 100;
    // }
    this.text.update(finalScore);
  };

  isCollide(
    element1,
    element2,
    element1Width,
    element2Width,
    element1Height,
    element2Height
  ) {
    return !(
      element1.y + element1Height - 15 < element2.y ||
      element1.y > element2.y + element2Height - 15 ||
      element1.x + element1Width - 15 < element2.x ||
      element1.x > element2.x + element2Width - 15
    );
  }

  // addDeadEnemiesToScore = () => {
  //   if (enemy.y + ENEMY_HEIGHT > this.player.y && enemy.x !== this.player.x) {
  //     this.score + 100;
  //   }
  // }

  gameLoop = () => {
    this.scoreCounter();
    let timeDiff = this.calcTimeDifference();
    this.updateEnemyPosition(timeDiff);
    this.filterDestroyedEnemies();
    this.addEnemies();
    this.player.updateBulletPosition();
    // this.text.update("1337");
    this.checkIfDeadOrContinue();
    this.player.filterDestroyedBullets();
    this.killHitEnemies();

    // We check if the player is dead. If he is, we alert the user
    // and return from the method (Why is the return statement important?)

    /* if the player is dead, this return short circuits the gameloop before we hit the next setTime out, thus ending 
    the game by not updating its loop, which the game, cause the game loop looping is the game
    */
    // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
    // setTimeout(this.gameLoop, 20);
    // this is
    // set timeout takes a callback function, and a time; when the time runs out it calls the callsback
  };

  // This method is not implemented correctly, which is why
  // the burger never dies. In your exercises you will fix this method.
  // isPlayerDead = () => {
  //   let deadPlayer = false;
  //   this.enemies.forEach((enemy) => {
  //     if (enemy.y + ENEMY_HEIGHT > this.player.y && enemy.x === this.player.x) {
  //       deadPlayer = true;
  //     }
  //   });

  //   return deadPlayer;

  //   // *** here we check to see if contact is made, if else (if it's not - game not over, if it is, game over)
  // };

  isPlayerDead = () => {
    let deadPlayer = false;
    this.enemies.forEach((enemy) => {
      if (
        this.isCollide(
          this.player,
          enemy,
          PLAYER_WIDTH,
          ENEMY_WIDTH,
          PLAYER_HEIGHT,
          ENEMY_HEIGHT
        )
      ) {
        deadPlayer = true;
      }
    });
    return deadPlayer;
  };

  killHitEnemies = () => {
    this.player.bullets.forEach((bullet) => {
      this.enemies.forEach((enemy) => {
        if (
          this.isCollide(
            bullet,
            enemy,
            BULLET_WIDTH,
            ENEMY_WIDTH,
            BULLET_HEIGHT,
            ENEMY_HEIGHT
          )
        ) {
          enemy.destroy();
          this.filterDestroyedEnemies();
          bullet.destroyBullet();
          this.player.filterDestroyedBullets();
        }
      });
    });
  };
}

// removeHitEnemy = () => {
//   if (this.isEnemyDead() === true) {
//     this.enemy.root.removeChild(this.domElement);
//     this.enemy.destroyed = true;
//   }
// }

// colider = (Object1, Object2, Object1_Height, Object2_Height, Object1_Width, Object2_Width) => {

// }

// function isCollision(element1, element2,
//   element1Width, element2Width,
//   element1Height, element2Height) {
//     if (
//       ((element2.y > element1.y) &&
//       (element2.y < (element1.y + element1Height))) &&
//       ((element2.x > element1.x) &&
//       (element2.x < (element1.x + element1Width)))) {
//       return true;
//     }
//   }

// returns true if there's a collision; this checks to see if the elements are not touching, if they're not not
// touching, there's a collision
/*
function isCollide(a, b) {
    return !(
        ((a.y + a.height) < (b.y)) ||
        (a.y > (b.y + b.height)) ||
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width))
    );
}
*/

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
