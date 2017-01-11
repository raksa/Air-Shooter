"use strict";
AirShooter.Game.prototype.createShipTrail = function () {
    this.shipTrail = this.add.emitter(this.player.x, this.player.y + 10, 400);
    this.shipTrail.width = 10;
    this.shipTrail.makeParticles(this.getImageName("bullet"));
    this.shipTrail.setXSpeed(30, -30);
    this.shipTrail.setYSpeed(200, 180);
    this.shipTrail.setRotation(50, -50);
    this.shipTrail.setAlpha(1, 0.01, AirShooter.GAME_WIDTH);
    this.shipTrail.setScale(0.05, 0.4, 0.05, 0.4, 2000, Phaser.Easing.Quintic.Out);
    this.shipTrail.start(false, 5000, 10);
};