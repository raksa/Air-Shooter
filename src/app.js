"use strict";
(function () {
    var game = new Phaser.Game(AirShooter.GAME_WIDTH, AirShooter.GAME_HEIGHT, Phaser.AUTO, 'game');
    game.state.add('Boot', AirShooter.Boot);
    game.state.add('Preloader', AirShooter.Preloader);

    //	Now start the Boot state.
    game.state.start('Boot');
})();