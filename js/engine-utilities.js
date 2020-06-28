// In this file we have functions that will be used in the Engine.js file.
// nextEnemySpot is a variable that refers to a function. The function has one parameter,
// which we called enemies. enemies will refer to an array that will contain instances of the
// Enemy class. To get more information about the argument that will get passed to this function,
// please see the Engine.js file.

// The purpose of this function is to determine in which slot to place our next enemy.
// The possibilities are 0, 1, 2, 3 or 4.
const nextEnemySpot = (enemies) => {
  
  // enemySpots will refer to the number of spots available (can you calculate it?)
  const enemySpots = GAME_WIDTH / ENEMY_WIDTH;

  const spotsTaken = [false, false, false, false, false];
  enemies.forEach((enemy) => {
    spotsTaken[enemy.spot] = true;
  });
 
  let candidate = undefined;
  while (candidate === undefined || spotsTaken[candidate]) {
    // candidate is assigned a random number between 0 and enemySpots (not including enemySpots). (what number is enemySpots?)
    candidate = Math.floor(Math.random() * enemySpots);
  }

  // do {
  //   candidate = Math.floor(Math.random() * enemySpots);
  // } while (spotsTaken[candidate])
  // above would also work
  /*
  we want to place an enemy at an empty lane, not the first one but a random one
  by setting up a while loop that chooses a random index, 
  if spots taken at the index is true, it's going to continue looping (by randomly choosing an index) until it finds a lane that
  is false (empty), and then once that happens, that index becomes the next enemy's spot
  it just keeps redefining index until it finds an empty
  */

  // When the while loop is finished, we are assured that we have a number that corresponds to a free spot, so we return it.
  return candidate;
};

// addBackground contains all the logic to display the starry background of the game.
// It is a variable that refers to a function.
// The function takes one parameter
// The parameter represents the DOM node to which we will add the background
const addBackground = (root) => {
  // We create a new img DOM node.
  const bg = document.createElement('img');

  // We set its src attribute and the height and width CSS attributes
  bg.src = 'images/stars.png';
  bg.style.height = `${GAME_HEIGHT}px`;
  bg.style.width = `${GAME_WIDTH}px`;

  // We add it to the root DOM node
  root.append(bg);

  // We don't want the enemies to go beyond the lower edge of the image
  // so we place a white div to hide the enemies after they reach the bottom.
  // To see what it does, you can comment out all the remaining lines in the function to see the effect.
  const whiteBox = document.createElement('div');

  // We put a high z-index so that the div is placed over all other DOM nodes
  whiteBox.style.zIndex = 100;
  whiteBox.style.position = 'absolute';
  whiteBox.style.top = `${GAME_HEIGHT}px`;
  whiteBox.style.height = `${ENEMY_HEIGHT}px`;
  whiteBox.style.width = `${GAME_WIDTH}px`;
  whiteBox.style.background = '#fff';
  root.append(whiteBox);
};

 /* .spot defined somewhre in the enemy class, it has to be cause it's being called on an enemy
  enemy is a bunch of different things, and every enemy will have a diff this.spot attribute/key
  engine calls this function (nextEnemySpot) it gets a returned value, and that value is going to be used to create an enemy
  when an enemy gets created, it gets defined an attribute this.spot
  every time we create an enemy, this function gets called, it will usually give a diff return value
  this function determines uniqueness, to avoid overlapping enemies
  how can we determine that a lane is taken, and not place an enemy there 
  spotsTaken is a different array than enemies that looks at the enemies array, asks "for each enemy, say 'in its spot, true'
  so that later, enemies can be added to the elements of spotsTaken that are false
  */