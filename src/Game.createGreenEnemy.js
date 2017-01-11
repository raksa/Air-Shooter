"use strict";
AirShooter.Game.prototype.createGreenEnemy = function () {
    this.greenEnemies = this.add.group();
    this.greenEnemies.enableBody = true;
    this.greenEnemies.physicsBodyType = Phaser.Physics.ARCADE;
    this.greenEnemies.createMultiple(5, this.getImageName("enemy-green"));
    this.greenEnemies.setAll('anchor.x', 0.5);
    this.greenEnemies.setAll('anchor.y', 0.5);
    this.greenEnemies.setAll('scale.x', 0.5);
    this.greenEnemies.setAll('scale.y', 0.5);
    this.greenEnemies.setAll('angle', 180);
    this.greenEnemies.forEach(function (enemy) {
        this.addEnemyEmitterTrail(enemy);
        enemy.body.setSize(enemy.width * 3 / 4, enemy.height * 3 / 4);
        enemy.damageAmount = 20;
        enemy.events.onKilled.add(function () {
            this.trail.kill();
        }, enemy);
    }, this);

    this.time.events.add(1000, this.launchGreenEnemy, this);
};