// In this file we have some data that the other source files will use.
// Most of this data is stored in constants.
// Constants are just variables that never change. By convention,
// We write constants with upper case letters.

// The GAME_WIDTH and GAME_HEIGHT constants denote the size
// of the game area in pixels and is used in engine-utilities.js.

const GAME_WIDTH = 525;
const GAME_HEIGHT = 700;

// These constants represent the width and height of an enemy in pixels
// as well as the maximum number of enemies on screen at any given time.
const ENEMY_WIDTH = 75;
const ENEMY_HEIGHT = 156;
const MAX_ENEMIES = 1;

// These constants represent the player width and height.
const PLAYER_WIDTH = 75;
const PLAYER_HEIGHT = 54;

const BULLET_WIDTH = 20;
const BULLET_HEIGHT = 50;
// *** if there was one lane we're gonna ask is there any enemy below where player is (we're 54 high, so below ~450 px ); if yes,
// game over; now that there are multiple lanes, we check the horizontal position as well
// we have to way to grab points out of player
