"use strict";
AirShooter.Game.prototype.createGameOver = function () {
    this.gameOver = this.add.text(this.world.centerX, this.world.centerY, 'GAME OVER!', {
        font: "45px " + AirShooter.fontFaces[0],
        fill: "#ff0000",
        align: "center"
    });
    this.gameOver.anchor.setTo(0.5);
    this.gameOver.visible = false;
};