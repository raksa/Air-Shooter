"use strict";
AirShooter.Game.prototype.fireBullet = function () {
    switch (this.player.weaponLevel) {
        case 1:
            //  To avoid them being allowed to fire too fast we set a time limit
            if (this.time.now > this.bulletTimer) {
                var BULLET_SPEED = 400;
                var BULLET_SPACING = 250;
                //  Grab the first bullet we can from the pool
                var bullet = this.bullets.getFirstExists(false);

                if (bullet) {
                    //  And fire it
                    //  Make bullet come out of tip of ship with right angle
                    var bulletOffset = 20 * Math.sin(this.math.degToRad(this.player.angle));
                    bullet.reset(this.player.x + bulletOffset, this.player.y);
                    bullet.angle = this.player.angle;
                    this.physics.arcade.velocityFromAngle(bullet.angle - 90, BULLET_SPEED, bullet.body.velocity);
                    bullet.body.velocity.x += this.player.body.velocity.x;

                    this.bulletTimer = this.time.now + BULLET_SPACING;
                }
            }
            break;

        case 2:
            if (this.time.now > this.bulletTimer) {
                var BULLET_SPEED = 400;
                var BULLET_SPACING = 550;


                for (var i = 0; i < 3; i++) {
                    var bullet = this.bullets.getFirstExists(false);
                    if (bullet) {
                        //  Make bullet come out of tip of ship with right angle
                        var bulletOffset = 20 * Math.sin(this.math.degToRad(this.player.angle));
                        bullet.reset(this.player.x + bulletOffset, this.player.y);
                        //  "Spread" angle of 1st and 3rd bullets
                        var spreadAngle;
                        if (i === 0) spreadAngle = -20;
                        if (i === 1) spreadAngle = 0;
                        if (i === 2) spreadAngle = 20;
                        bullet.angle = this.player.angle + spreadAngle;
                        this.physics.arcade.velocityFromAngle(spreadAngle - 90, BULLET_SPEED, bullet.body.velocity);
                        bullet.body.velocity.x += this.player.body.velocity.x;
                    }
                    this.bulletTimer = this.time.now + BULLET_SPACING;
                }
            }
    }
};