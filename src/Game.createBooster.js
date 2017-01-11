"use strict";
AirShooter.Game.prototype.createBooster = function () {
    this.booster = this.add.emitter(this.boss.body.x, this.boss.body.y - this.boss.height / 2);
    this.booster.width = 0;
    this.booster.makeParticles(this.getImageName("enemy-blue-bullet"));
    this.booster.forEach(function (p) {
        p.crop({ x: 120, y: 0, width: 45, height: 50 });
        //  clever way of making 2 exhaust trails by shifing particles randomly left or right
        p.anchor.x = this.rnd.pick([1, -1]) * 0.95 + 0.5;
        p.anchor.y = 0.75;
    }, this);
    this.booster.setXSpeed(0, 0);
    this.booster.setRotation(0, 0);
    this.booster.setYSpeed(-30, -50);
    this.booster.gravity = 0;
    this.booster.setAlpha(1, 0.1, 400);
    this.booster.setScale(0.3, 0, 0.7, 0, 5000, Phaser.Easing.Quadratic.Out);
    this.boss.bringToTop();
};