"use strict";
AirShooter.Game.prototype.launchGreenEnemy = function () {
    var ENEMY_SPEED = 300;

    var enemy = this.greenEnemies.getFirstExists(false);
    if (enemy) {
        enemy.reset(this.rnd.integerInRange(0, this.game.width), -20);
        enemy.body.velocity.x = this.rnd.integerInRange(-300, 300);
        enemy.body.velocity.y = ENEMY_SPEED;
        enemy.body.drag.x = 100;

        enemy.trail.start(false, AirShooter.GAME_WIDTH, 1);
        enemy.game = this;

        //  Update function for each enemy ship to update rotation etc
        enemy.update = function () {
            enemy.angle = 180 - this.game.math.radToDeg(Math.atan2(enemy.body.velocity.x, enemy.body.velocity.y));

            enemy.trail.x = enemy.x;
            enemy.trail.y = enemy.y - 10;

            //  Kill enemies once they go off screen
            if (enemy.y > this.game.game.height + 200) {
                enemy.kill();
                enemy.y = -20;
            }
        }
    }

    //  Send another enemy soon
    this.greenEnemyLaunchTimer = this.time.events.add(this.rnd.integerInRange(this.greenEnemySpacing, this.greenEnemySpacing + 1000),
        this.launchGreenEnemy, this);
};