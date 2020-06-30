class Bullet {
  constructor(theRoot, player) {
    this.root = theRoot;


    // The x position of the enemy is determined by its width and its spot. We need this information for the 
    // lifetime of the instance, so we make it a property of the instance. 
    // (Why is this information needed for the lifetime of the instance?)
    this.x = player.x;

    // The y position is initially less than 0 so that the enemies fall from the top. This data is stored as a 
    // property of the instance since it is needed throughout its lifetime. The destroyed property will indicate
    //  whether this enemy is still in play. It is set to true whenever the enemy goes past the bottom of the 
    // screen. It is used in the Engine to determine whether or not an enemy is in a particular column.
    this.y = player.y;
    this.destroyed = false;

    // We create a new DOM element. The tag of this DOM element is img. It is the DOM node that will display the enemy image
    // to the user. When the enemy is no longer needed, we will use a reference to this DOM node to remove it from the game. This
    // is why we create a property that refers to it.
    this.domElement = document.createElement("img");

    // We give it a src attribute to specify which image to display.
    this.domElement.src = "./images/laser.png";
    // We modify the CSS style of the DOM node.
    this.domElement.style.position = "absolute";
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = `${this.y}px`;
    this.domElement.style.zIndex = 5;

    // Show that the user can actually see the img DOM node, we append it to the root DOM node.
    this.root.appendChild(this.domElement);
    this.speed = 5;
  }
  
  destroyBullet = () => {
    this.root.removeChild(this.domElement);
    this.destroyed = true;
  }

  bulletUpdate() {
    // We update the y property of the instance in proportion of the amount of time
    // since the last call to update. We also update the top css property so that the image
    // is updated on screen
    this.y = this.y -15;
    this.domElement.style.top = `${this.y}px`;

    // If the y position of the DOM element is greater than the GAME_HEIGHT then the enemy is at the bottom
    // of the screen and should be removed. We remove the DOM element from the root DOM element and we set
    // the destroyed property to indicate that the enemy should no longer be in play
    if (this.y <= 0 && !this.destroyed) {
      this.destroyBullet();
    }
  }
}
