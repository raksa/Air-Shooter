"use strict";
AirShooter.Game.prototype.launchBlueEnemy = function () {
    var startingX = this.rnd.integerInRange(100, this.game.width - 100);
    var verticalSpeed = 180;
    var spread = 60;
    var frequency = 70;
    var verticalSpacing = 70;
    var numEnemiesInWave = 5;

    //  Launch wave
    for (var i = 0; i < numEnemiesInWave; i++) {
        var enemy = this.blueEnemies.getFirstExists(false);
        if (enemy) {
            enemy.startingX = startingX;
            enemy.reset(this.game.width / 2, -verticalSpacing * i);
            enemy.body.velocity.y = verticalSpeed;
            //  Set up firing
            enemy.bullets = 1;
            enemy.lastShot = 0;
            enemy.game = this;
            //  Update function for each enemy
            enemy.update = function () {
                //  Wave movement
                this.body.x = this.startingX + Math.sin((this.y) / frequency) * spread;
                //  Squish and rotate ship for illusion of "banking"
                this.game.bank = Math.cos((this.y + 60) / frequency)
                this.scale.x = 0.5 - Math.abs(this.game.bank) / 8;
                this.angle = 180 - this.game.bank * 2;
                //  Fire
                var bulletSpeed = 400;
                var firingDelay = 2000;
                var enemyBullet = this.game.blueEnemyBullets.getFirstExists(false);
                if (enemyBullet && this.alive && this.bullets && this.y > this.game.game.width / 8 &&
                    this.game.time.now > firingDelay + this.lastShot) {
                    this.lastShot = this.game.time.now;
                    this.bullets--;
                    enemyBullet.reset(this.x, this.y);
                    enemyBullet.damageAmount = this.damageAmount;
                    var angle = this.game.physics.arcade.moveToObject(enemyBullet, this.game.player, bulletSpeed);
                    enemyBullet.angle = this.game.math.radToDeg(angle);
                }
                //  Kill enemies once they go off screen
                if (this.y > this.game.game.height + 200) {
                    this.kill();
                    this.y = -20;
                }
            };
        }
    }

    //  Send another wave soon
    this.blueEnemyLaunchTimer = this.time.events.add(this.rnd.integerInRange(this.blueEnemySpacing, this.blueEnemySpacing + 4000), this.launchBlueEnemy, this);
};