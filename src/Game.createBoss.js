"use strict";
AirShooter.Game.prototype.createBoss = function () {
    this.boss = this.add.sprite(0, 0, this.getImageName("boss"));
    this.boss.exists = false;
    this.boss.alive = false;
    this.boss.anchor.setTo(0.5);
    this.boss.damageAmount = 50;
    this.boss.angle = 180;
    this.boss.scale.setTo(0.6);
    this.physics.enable(this.boss, Phaser.Physics.ARCADE);
    this.boss.body.maxVelocity.setTo(100, 80);
    this.boss.dying = false;
    this.boss.game = this;
    this.boss.finishOff = function () {
        if (!this.dying) {
            this.dying = true;
            this.game.bossDeath.x = this.x;
            this.game.bossDeath.y = this.y;
            this.game.bossDeath.start(false, 1000, 50, 20);
            //  kill boss after explotions
            this.game.time.events.add(1000, function () {
                var explosion = this.game.explosions.getFirstExists(false);
                var beforeScaleX = this.game.explosions.scale.x;
                var beforeScaleY = this.game.explosions.scale.y;
                var beforeAlpha = this.game.explosions.alpha;
                explosion.reset(this.body.x + this.body.halfWidth, this.body.y + this.body.halfHeight);
                explosion.alpha = 0.4;
                explosion.scale.x = 3;
                explosion.scale.y = 3;
                var animation = explosion.play('explosion', 30, false, true);
                animation.onComplete.addOnce(function () {
                    explosion.scale.x = beforeScaleX;
                    explosion.scale.y = beforeScaleY;
                    explosion.alpha = beforeAlpha;
                }, this);
                this.kill();
                this.game.booster.kill();
                this.dying = false;
                this.game.bossDeath.on = false;
                //  queue next boss
                this.game.bossLaunchTimer = this.game.time.events.add(this.game.rnd.integerInRange(this.game.bossSpacing, this.game.bossSpacing + 5000),
                    this.game.launchBoss, this.game);
            }, this);

            //  reset pacing for other enemies
            this.game.blueEnemySpacing = 2500;
            this.game.greenEnemySpacing = 1000;

            //  give some bonus health
            this.game.player.health = Math.min(100, this.game.player.health + 40);
            this.game.shields.render();
        }
    };

    //  Boss death ray
    function addRay(leftRight) {
        var ray = this.add.sprite(leftRight * this.boss.width * 0.75, 0, this.getImageName("death-ray"));
        ray.alive = false;
        ray.visible = false;
        this.boss.addChild(ray);
        ray.crop({
            x: 0,
            y: 0,
            width: 40,
            height: 40
        });
        ray.anchor.setTo(0.5);
        ray.scale.x = 2.5;
        ray.damageAmount = this.boss.damageAmount;
        this.physics.enable(ray, Phaser.Physics.ARCADE);
        ray.body.setSize(ray.width / 5, ray.height);
        ray.game = this;
        ray.update = function () {
            this.alpha = this.game.rnd.realInRange(0.6, 1);
        };
        if (!~leftRight) this.boss.rayLeft = ray;
        else this.boss.rayRight = ray;
    }
    addRay.call(this, 1);
    addRay.call(this, -1);
    //  need to add the ship texture to the group so it renders over the rays
    var ship = this.add.sprite(0, 0, this.getImageName("boss"));
    ship.anchor = { x: 0.5, y: 0.5 };
    this.boss.addChild(ship);

    this.boss.fire = function () {
        if (this.game.time.now > this.game.bossBulletTimer) {
            var raySpacing = 3000;
            var chargeTime = 1500;
            var rayTime = 1500;

            var chargeAndShoot = function(isLeft) {
                var ray = isLeft ? this.rayLeft : this.rayRight;
                ray.name = isLeft ? "Left" : "Right";
                ray.revive();
                ray.y = 80;
                ray.alpha = 0;
                ray.scale.y = 13;
                this.game.add.tween(ray).to({ alpha: 1 }, chargeTime, Phaser.Easing.Linear.In, true).onComplete.add(function (ray) {
                    ray.scale.y = 150;
                    this.game.add.tween(ray).to({ y: -1500 }, rayTime, Phaser.Easing.Linear.In, true).onComplete.add(function (ray) {
                        ray.kill();
                    }, this);
                }, this);
            }
            chargeAndShoot.call(this, true);
            chargeAndShoot.call(this, false);

            this.game.bossBulletTimer = this.game.time.now + raySpacing;
        }
    };

    this.boss.update = function () {
        if (!this.alive) return;

        this.rayLeft.update();
        this.rayRight.update();

        if (this.y > 140) {
            this.body.acceleration.y = -50;
        }
        if (this.y < 140) {
            this.body.acceleration.y = 50;
        }
        if (this.x > this.game.player.x + 50) {
            this.body.acceleration.x = -50;
        } else if (this.x < this.game.player.x - 50) {
            this.body.acceleration.x = 50;
        } else {
            this.body.acceleration.x = 0;
        }
        //  Squish and rotate boss for illusion of "banking"
        var bank = this.body.velocity.x / this.game.MAXSPEED;
        this.scale.x = 0.6 - Math.abs(bank) / 3;
        this.angle = 180 - bank * 20;

        this.game.booster.x = this.x + -5 * bank;
        this.game.booster.y = this.y + 10 * Math.abs(bank) - this.height / 2;

        //  fire if player is in target
        var angleToPlayer = this.game.math.radToDeg(this.game.physics.arcade.angleBetween(this, this.game.player)) - 90;
        var anglePointing = 180 - Math.abs(this.angle);
        if (anglePointing - angleToPlayer < 18) {
            this.fire();
        }
    }
};