"use strict";
AirShooter.Game.prototype.createBlueEnemyBullet = function () {
    this.blueEnemyBullets = this.add.group();
    this.blueEnemyBullets.enableBody = true;
    this.blueEnemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.blueEnemyBullets.createMultiple(30, this.getImageName("enemy-blue-bullet"));
    this.blueEnemyBullets.callAll('crop', null, {
        x: 90,
        y: 0,
        width: 90,
        height: 70
    });
    this.blueEnemyBullets.setAll('alpha', 0.9);
    this.blueEnemyBullets.setAll('anchor.x', 0.5);
    this.blueEnemyBullets.setAll('anchor.y', 0);
    this.blueEnemyBullets.setAll('outOfBoundsKill', true);
    this.blueEnemyBullets.setAll('checkWorldBounds', true);
    this.blueEnemyBullets.forEach(function (enemy) {
        enemy.body.setSize(20, 20);
    }, this);
};