"use strict";
AirShooter.Game.prototype.createInputListener = function () {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
};