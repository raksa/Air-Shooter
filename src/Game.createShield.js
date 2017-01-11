"use strict";
AirShooter.Game.prototype.createShield = function () {
    var bg = this.add.image(this.game.width + 20, 0, this.getImageName("bg-info"));
    bg.position.x -= bg.width;
    this.shields = this.add.text(this.world.width - 10, 10, '' + this.player.health + '%', {
        font: "35px " + AirShooter.fontFaces[0],
        fill: "#ffffff",
        align: "right"
    });
    this.shields.anchor.setTo(1, 0);
    this.shields.game = this;
    this.shields.render = function () {
        this.game.shields.setText('Shields: ' + Math.max(this.game.player.health, 0) + '%');
    };
    this.shields.render();
};