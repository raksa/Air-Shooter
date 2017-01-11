"use strict";
AirShooter.Game = function () {
    this.ACCLERATION = AirShooter.GAME_HEIGHT;
    this.DRAG = 400;
    this.MAXSPEED = 400;
};

AirShooter.Game.prototype = AirShooter.gameProto({
    init: function () {
        this._init();

        this.bulletTimer = 0;
        this.score = 0;
        this.greenEnemySpacing = 1000;
        this.blueEnemyLaunched = false;
        this.blueEnemySpacing = 2500;
        this.bossLaunched = false;
        this.bossSpacing = 20000;
        this.bossBulletTimer = 0;
    },
    create: function () {
        //  The scrolling background
        this.bgCloudRock = this.add.tileSprite(0, 0, 1136, 2000, this.getImageName("bg-cloud-rock"));
        this.bgCloudRock.scale.setTo(this.game.width / this.bgCloudRock.width);
        this.bgLeftRight = this.add.tileSprite(0, 0, 1136, 2000, this.getImageName("bg-left-right"));
        this.bgLeftRight.scale.setTo(this.game.width / this.bgLeftRight.width);
        //  Our bullet group
        this.createBullet();
        //  The hero!
        this.createHero();
        //  The baddies!
        this.createGreenEnemy();
        //  Blue enemy's bullets
        this.createBlueEnemyBullet();
        //  More baddies!
        this.createBlueEnemy();
        //  The boss
        this.createBoss();
        //  boss's boosters
        this.createBooster();
        //  And some controls to play the game with
        this.createInputListener();
        //  Add an emitter for the ship's trail
        this.createShipTrail();
        //  An explosion pool
        this.createExplosion();
        //  Big explosion
        this.createBigExplosion();
        //  Big explosion for boss
        this.createBossDeath();
        //  Shields stat
        this.createShield();
        //  Score
        this.createScore();
        //  Game over text
        this.createGameOver();

        window.airShooter = this;
    },
    update: function () {
        //  Scroll the background
        this.bgCloudRock.tilePosition.y += 1.5;
        this.bgLeftRight.tilePosition.y += 1.7;

        //  Reset the player, then check for movement keys
        this.player.body.acceleration.x = 0;
        if (this.cursors.left.isDown) this.player.body.acceleration.x = -this.ACCLERATION;
        else if (this.cursors.right.isDown) this.player.body.acceleration.x = this.ACCLERATION;

        //  Stop at screen edges
        if (this.player.x > this.game.width - 50) {
            this.player.x = this.game.width - 50;
            this.player.body.acceleration.x = 0;
        }
        if (this.player.x < 50) {
            this.player.x = 50;
            this.player.body.acceleration.x = 0;
        }

        //  Fire bullet
        if (this.player.alive && (this.fireButton.isDown || this.input.activePointer.isDown)) {
            this.fireBullet();
        }

        //  Move ship towards mouse pointer
        if (this.input.x < this.game.width - 20 && this.input.x > 20 && this.input.y > 20 && this.input.y < this.game.height - 20) {
            var minDist = 200;
            var dist = this.input.x - this.player.x;
            this.player.body.velocity.x = this.MAXSPEED * this.math.clamp(dist / minDist, -1, 1);
        }

        //  Squish and rotate ship for illusion of "banking"
        this.bank = this.player.body.velocity.x / this.MAXSPEED;
        this.player.scale.x = 1 - Math.abs(this.bank) / 2;
        this.player.angle = this.bank * 30;

        //  Keep the this.shipTrail lined up with the ship
        this.shipTrail.x = this.player.x;

        //  Check collisions
        this.physics.arcade.overlap(this.player, this.greenEnemies, this.shipCollide, null, this);
        this.physics.arcade.overlap(this.greenEnemies, this.bullets, this.hitEnemy, null, this);

        this.physics.arcade.overlap(this.player, this.blueEnemies, this.shipCollide, null, this);
        this.physics.arcade.overlap(this.blueEnemies, this.bullets, this.hitEnemy, null, this);

        this.physics.arcade.overlap(this.boss, this.bullets, this.hitEnemy, this.bossHitTest, this);
        this.physics.arcade.overlap(this.player, this.boss.rayLeft, this.enemyHitsPlayer, null, this);
        this.physics.arcade.overlap(this.player, this.boss.rayRight, this.enemyHitsPlayer, null, this);

        this.physics.arcade.overlap(this.blueEnemyBullets, this.player, this.enemyHitsPlayer, null, this);

        //  Game over?
        if (!this.player.alive && this.gameOver.visible === false) {
            this.gameOver.visible = true;
            this.gameOver.alpha = 0;
            var fadeInGameOver = this.add.tween(this.gameOver);
            fadeInGameOver.to({ alpha: 1 }, 1000, Phaser.Easing.Quintic.Out);
            fadeInGameOver.onComplete.add(function () {
                //  The "click to restart" handler
                function _restart() {
                    tapRestart.detach();
                    this.spaceRestart.detach();
                    this.restart();
                }
                var tapRestart = this.input.onTap.addOnce(_restart, this);
                this.spaceRestart = this.fireButton.onDown.addOnce(_restart, this);

            }, this);
            fadeInGameOver.start();
        }
    },
    render: function () {
        // for (var i = 0; i < this.greenEnemies.length; i++) {
        //     this.game.debug.body(this.greenEnemies.children[i]);
        // }
        // for (i = 0; i < this.greenEnemies.length; i++) {
        //     this.game.debug.body(this.blueEnemies.children[i]);
        // }
        // for (i = 0; i< this.bullets.length; i++){
        //     this.game.debug.body(this.bullets.children[i]);
        // }
        // for (i = 0; i< this.blueEnemyBullets.length; i++){
        //     this.game.debug.body(this.blueEnemyBullets.children[i]);
        // }
        // this.game.debug.body(this.boss.rayLeft);
        // this.game.debug.body(this.boss.rayRight);
        // this.game.debug.spriteBounds(this.boss.rayLeft);
        // this.game.debug.spriteBounds(this.boss.rayRight);
        // this.game.debug.body(this.player);
    }
});