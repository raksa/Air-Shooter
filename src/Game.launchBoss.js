"use strict";
AirShooter.Game.prototype.launchBoss = function () {
    this.boss.reset(this.game.width / 2, -this.boss.height);
    this.booster.start(false, 1000, 10);
    this.boss.health = 501;
    this.bossBulletTimer = this.time.now + 5000;
};