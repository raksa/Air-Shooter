"use strict";
AirShooter.Game.prototype.createBigExplosion = function () {
    this.playerDeath = this.add.emitter(this.player.x, this.player.y);
    this.playerDeath.width = 50;
    this.playerDeath.height = 50;
    this.playerDeath.makeParticles(this.getImageName("explosion"), [0, 1, 2, 3, 4, 5, 6, 7], 10);
    this.playerDeath.setAlpha(0.9, 0, AirShooter.GAME_WIDTH);
    this.playerDeath.setScale(0.1, 0.6, 0.1, 0.6, 1000, Phaser.Easing.Quintic.Out);
};