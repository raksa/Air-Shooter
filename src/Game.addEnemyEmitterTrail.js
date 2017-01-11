"use strict";
AirShooter.Game.prototype.addEnemyEmitterTrail = function (enemy) {
    var enemyTrail = this.add.emitter(enemy.x, this.player.y - 10, 100);
    enemyTrail.width = 10;
    enemyTrail.makeParticles(this.getImageName("explosion"), [1, 2, 3, 4, 5]);
    enemyTrail.setXSpeed(20, -20);
    enemyTrail.setRotation(50, -50);
    enemyTrail.setAlpha(0.4, 0, AirShooter.GAME_WIDTH);
    enemyTrail.setScale(0.01, 0.1, 0.01, 0.1, 1000, Phaser.Easing.Quintic.Out);
    enemy.trail = enemyTrail;
};