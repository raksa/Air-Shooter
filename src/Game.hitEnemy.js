"use strict";
AirShooter.Game.prototype.hitEnemy = function (enemy, bullet) {
    var explosion = this.explosions.getFirstExists(false);
    explosion.reset(bullet.body.x + bullet.body.halfWidth, bullet.body.y + bullet.body.halfHeight);
    explosion.body.velocity.y = enemy.body.velocity.y;
    explosion.alpha = 0.7;
    explosion.play('explosion', 30, false, true);
    if (enemy.finishOff && enemy.health < 5) {
        enemy.finishOff();
    } else {
        enemy.damage(enemy.damageAmount);
    }
    bullet.kill();

    // Increase this.score
    this.score += enemy.damageAmount * 10;
    this.scoreText.render();

    //  Pacing

    //  Enemies come quicker as score increases
    this.greenEnemySpacing *= 0.9;

    //  Blue enemies come in after a score of 1000
    if (!this.blueEnemyLaunched && this.score > 500) {
        this.blueEnemyLaunched = true;
        this.launchBlueEnemy();
        //  Slow green enemies down now that there are other enemies
        this.greenEnemySpacing *= 2;
    }

    //  Launch boss
    if (!this.bossLaunched && this.score > 1000) {
        this.greenEnemySpacing = 5000;
        this.blueEnemySpacing = 12000;
        //  dramatic pause before boss
        this.time.events.add(2000, function () {
            this.bossLaunched = true;
            this.launchBoss();
        }, this);
    }

    //  Weapon upgrade
    if (this.score > 5000 && this.player.weaponLevel < 2) {
        this.player.weaponLevel = 2;
    }
};