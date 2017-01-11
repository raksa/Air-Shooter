"use strict";

window.onerror = function (message, url, lineNo){
    alert('Error: ' + message + '\n' + 'Line Number: ' + lineNo);
    return true;
}

var AirShooter = {
	fontFaces: [
		"HOUSE-A-RAMA-KINGPIN"
	],

	GAME_WIDTH: 600,
	GAME_HEIGHT: 800,
	GAME_MIN_WIDTH: 260,
	GAME_MIN_HEIGHT: 480,

	PREFIX_IMAGE: "img-",

	gameProto: function (option) {
		option._getImageName = function (prefix, key) {
			return prefix + key;
		};
		option.getImageName = function (key) {
			return this._getImageName(AirShooter.PREFIX_IMAGE, key);
		};
		option._init = function () {

		};
		return option;
	}
};

AirShooter.Boot = function () {
};

AirShooter.Boot.prototype = AirShooter.gameProto({

	init: function () {

		this._init();
		// set up input max pointers
		this.input.maxPointers = 1;
		// set up stage disable visibility change
		this.stage.disableVisibilityChange = false;
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		if (this.game.device.desktop) {
			this.scale.setMinMax(AirShooter.GAME_MIN_WIDTH, AirShooter.GAME_MIN_HEIGHT, AirShooter.GAME_WIDTH, AirShooter.GAME_HEIGHT);
		} else {
			var ua = navigator.userAgent.toLowerCase();
			var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
			if (isAndroid) {
				this.scale.maxHeight = 300;
			} else {
				this.scale.maxHeight = window.innerHeight - 28;
			}
			this.scale.setResizeCallback(this.gameResized, this);
			this.scale.forceOrientation(false, true);
			this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
			this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
		}
	},

	gameResized: function () {
		if (this.game.device.desktop) {
			this.scale.setMinMax(AirShooter.GAME_MIN_WIDTH, AirShooter.GAME_MIN_HEIGHT, AirShooter.GAME_WIDTH, AirShooter.GAME_HEIGHT);
		} else {
			var ua = navigator.userAgent.toLowerCase();
			var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
			if (isAndroid) {
				this.scale.maxHeight = 300;
			} else {
				this.scale.maxHeight = window.innerHeight - 28;
			}
		}
	},

	enterIncorrectOrientation: function () {
		AirShooter.orientated = false;
		document.getElementById('orientation').style.display = 'block';
	},

	leaveIncorrectOrientation: function () {
		AirShooter.orientated = true;
		document.getElementById('orientation').style.display = 'none';
	},

	preload: function () {
		this.game.load.image(this.getImageName("loading"), 'assets/images/loading-bar.png');
		WebFont.load({
			custom: {
				families: AirShooter.fontFaces
			}
		});
	},

	create: function () {
		this.stage.backgroundColor = "#2efff3";
		this.state.start("Preloader");
	}

});