"use strict";
AirShooter.Game.prototype.restart = function () {
    //  Reset the enemies
    this.greenEnemies.callAll('kill');
    this.time.events.remove(this.greenEnemyLaunchTimer);
    this.time.events.add(1000, this.launchGreenEnemy, this);
    this.blueEnemies.callAll('kill');
    this.blueEnemyBullets.callAll('kill');
    this.time.events.remove(this.blueEnemyLaunchTimer);
    this.boss.kill();
    this.booster.kill();
    this.time.events.remove(this.bossLaunchTimer);

    this.blueEnemies.callAll('kill');
    this.time.events.remove(this.blueEnemyLaunchTimer);
    //  Revive the this.player
    this.player.weaponLevel = 1;
    this.player.revive();
    this.player.health = 100;
    this.shields.render();
    this.score = 0;
    this.scoreText.render();
    //  Hide the text
    this.gameOver.visible = false;
    //  Reset pacing
    this.greenEnemySpacing = 1000;
    this.blueEnemyLaunched = false;
    this.bossLaunched = false;
};