"use strict";
AirShooter.Game.prototype.shipCollide= function (player, enemy) {
        enemy.kill();

        this.player.damage(enemy.damageAmount);
        this.shields.render();

        if (this.player.alive) {
            var explosion = this.explosions.getFirstExists(false);
            explosion.reset(this.player.body.x + this.player.body.halfWidth, this.player.body.y + this.player.body.halfHeight);
            explosion.alpha = 0.7;
            explosion.play('explosion', 30, false, true);
        } else {
            this.playerDeath.x = this.player.x;
            this.playerDeath.y = this.player.y;
            this.playerDeath.start(false, 1000, 10, 10);
        }
    };