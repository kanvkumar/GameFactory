Candy.StoryHowto = function(game) {};
Candy.StoryHowto.prototype = {
	create: function() {
		this.fontText = { font: "48px ComicBook", fill: "#FFCC00", stroke: "#642D07", strokeThickness: 12 };
		this.showStory();
	},
	showStory: function() {
		this.audioStatus = storageAPI.get('audio') || false;
		this.soundClick = this.add.audio('audio-click');
		this.add.sprite(0, 0, 'background');
		this.add.sprite(0, 0, 'screen-story');

		this.add.text(10, 10, "Evil King kidnapped", this.fontText);
		this.add.text(320, 60, "your love!", this.fontText);
		this.add.text(10, 360, "Collect", this.fontText);
		this.add.text(10, 410, "enough candy", this.fontText);
		this.add.text(10, 460, "to get her back!", this.fontText);
		
		this.buttonContinue = this.add.button(-358, Candy.GAME_HEIGHT-133-10, 'button-continue', this.showHowto, this, 1, 0, 2);
		this.buttonContinue.input.useHandCursor = true;
		this.add.tween(this.buttonContinue).to({x: Candy.GAME_WIDTH-358-10}, 300, Phaser.Easing.Exponential.Out, true, 0, false);
	},
	showHowto: function() {
		if(this.audioStatus) {
			this.soundClick.play();
		}
		this.add.sprite(0, 0, 'background');
		this.add.sprite(420, 320, 'howto-bomb');
		var monster = this.add.sprite(-20, Candy.GAME_HEIGHT-262-5, 'howto-monster');
		monster.scale = {x:2,y:2};
		this.add.sprite(20, 80, 'howto-path');
        this.add.sprite(320, 586, 'life-full');
        this.add.sprite(410, 586, 'life-full');
        this.add.sprite(500, 586, 'life-empty');

		this.add.text(120, 10, "HOW TO PLAY", { font: "52px ComicBook", fill: "#FFCC00", stroke: "#642D07", strokeThickness: 12 });
		this.add.text(160, 190, "Tap the candy", this.fontText);
		this.add.text(240, 240, "to collect it!", this.fontText);
		this.add.text(60, 350, "Watch out", this.fontText);
		this.add.text(60, 400, "for the bomb!", this.fontText);
		this.add.text(20, 510, "If the candy fell off", this.fontText);
		this.add.text(20, 560, "the screen", this.fontText);
		this.add.text(260, 670, "you will lose", this.fontText);
		this.add.text(380, 720, "one life!", this.fontText);
		
		this.buttonContinue = this.add.button(-358, Candy.GAME_HEIGHT-133-10, 'button-continue', this.startGame, this, 1, 0, 2);
		this.buttonContinue.input.useHandCursor = true;
		this.add.tween(this.buttonContinue).to({x: Candy.GAME_WIDTH-358-10}, 300, Phaser.Easing.Exponential.Out, true, 0, false);
	},
	startGame: function() {
		if(this.audioStatus) {
			this.soundClick.play();
		}
		this.state.start('Game');
	}
};