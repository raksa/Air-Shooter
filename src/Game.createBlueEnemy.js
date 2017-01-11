"use strict";
AirShooter.Game.prototype.createBlueEnemy = function () {
    this.blueEnemies = this.add.group();
    this.blueEnemies.enableBody = true;
    this.blueEnemies.physicsBodyType = Phaser.Physics.ARCADE;
    this.blueEnemies.createMultiple(30, this.getImageName("enemy-blue"));
    this.blueEnemies.setAll('anchor.x', 0.5);
    this.blueEnemies.setAll('anchor.y', 0.5);
    this.blueEnemies.setAll('scale.x', 0.5);
    this.blueEnemies.setAll('scale.y', 0.5);
    this.blueEnemies.setAll('angle', 180);
    this.blueEnemies.forEach(function (enemy) {
        enemy.damageAmount = 40;
    });
};