"use strict";
AirShooter.Game.prototype.createHero = function () {
    this.player = this.add.sprite(this.world.centerX, 4 * this.game.height / 5, this.getImageName("player"));
    this.player.health = 100;
    this.player.anchor.setTo(0.5);
    this.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.body.maxVelocity.setTo(this.MAXSPEED, this.MAXSPEED);
    this.player.body.drag.setTo(this.DRAG, this.DRAG);
    this.player.weaponLevel = 1
    this.player.events.onKilled.add(function () {
        this.shipTrail.kill();
    }, this);
    this.player.events.onRevived.add(function () {
        this.shipTrail.start(false, 5000, 10);
    }, this);
};