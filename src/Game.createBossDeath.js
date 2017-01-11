"use strict";
AirShooter.Game.prototype.createBossDeath = function () {
    this.bossDeath = this.add.emitter(this.boss.x, this.boss.y);
    this.bossDeath.width = this.boss.width / 2;
    this.bossDeath.height = this.boss.height / 2;
    this.bossDeath.makeParticles(this.getImageName("explosion"), [0, 1, 2, 3, 4, 5, 6, 7], 20);
    this.bossDeath.setAlpha(0.9, 0, 900);
    this.bossDeath.setScale(0.3, 1.0, 0.3, 1.0, 1000, Phaser.Easing.Quintic.Out);
};