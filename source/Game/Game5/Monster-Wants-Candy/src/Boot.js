var Candy = {};
Candy.Boot = function(game){};
Candy.Boot.prototype = {
	preload: function(){
		this.load.image('preloaderBar', 'img/loading-bar.png');
		this.load.image('preloaderBackground', 'img/screen-loading.png');
	},
	create: function(){
		this.input.maxPointers = 1;
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.scale.setScreenSize(true);
		this.state.start('Preloader');
	}
};