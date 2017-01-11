"use strict";
AirShooter.Preloader = function () {
};

AirShooter.Preloader.prototype = AirShooter.gameProto({
	init: function () {
		this._init();
	},
	makeLoading: function () {
		var loadingSprite = this.game.cache.getImage(this.getImageName("loading"));
		this.preloadBar = this.game.add.sprite((this.game.width - loadingSprite.width) / 2, (this.game.height - loadingSprite.height) / 2, this.getImageName("loading"));
		this.load.setPreloadSprite(this.preloadBar);
	},
	preload: function () {
		this.makeLoading();

		this.loadImage(AirShooter.PREFIX_IMAGE, "assets/images", [
			"boss", "bullet", "death-ray", "enemy-blue-bullet", "enemy-blue", "enemy-green", "player", "bg-info",
			"bg-cloud-rock", "bg-left-right"
		]);
		this.load.spritesheet(this.getImageName("explosion"), "assets/images/explode.png", 128, 128);


		// we use this way to make requiring script before start to prevent debugging code
		// this.load.script("Game", "src/Game.js", function () {
		// 	["addEnemyEmitterTrail", "bossHitTest", "enemyHitsPlayer", "fireBullet", "hitEnemy", "launchBlueEnemy",
		// 		"launchBoss", "launchGreenEnemy", "restart", "shipCollide"].forEach(function (name) {
		// 			this.load.script(name, "src/Game." + name + ".js");
		// 		}, this);
		// }, this);

	},

	create: function () {
		this.preloadBar.cropEnabled = false;
		this.preloadBar.visible = false;
		this.state.add('Game', AirShooter.Game);
		this.game.state.start("Game");
	},

	loadImage: function (prefix, path, imageNames) {
		imageNames.forEach(function (name) {
			this.load.image(prefix + name, path + "/" + name + ".png");
		}, this);
	}

});