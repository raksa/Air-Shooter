"use strict";
AirShooter.Game.prototype.createScore = function () {
    var bg = this.add.image(-20, 0, this.getImageName("bg-info"));
    this.scoreText = this.add.text(10, 10, '', {
        font: "35px " + AirShooter.fontFaces[0],
        fill: "#ffffff",
        align: "left"
    });
    this.scoreText.game = this;
    this.scoreText.render = function () {
        this.game.scoreText.setText('Score: ' + this.game.score);
    };
    this.scoreText.render();
};