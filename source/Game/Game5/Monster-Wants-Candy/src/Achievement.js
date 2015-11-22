Candy.Achievements = function(game) {};
Candy.Achievements.prototype = {
	create: function() {
		this.backButton = this.add.button(0, 0, 'screen-achievements', function(){this.state.start('MainMenu')}, this, 1, 0, 2);
		var totalscore = storageAPI.get('totalscore');
		candyUnlockLevels = [0,10,25,50,100,250,500,1000,2500,5000,10000,25000];
		candyActualLevel = 0;
		for (var i=0,len=candyUnlockLevels.length; i<len; i++) {
			if(totalscore >= candyUnlockLevels[i]) {
				candyActualLevel = i;
			}
		}
		var text = {
			t40px: { font: "40px ComicBook", fill: "#FFF", stroke: "#000", strokeThickness: 6 },
			t32px: { font: "32px ComicBook", fill: "#FFF", stroke: "#000", strokeThickness: 6 },
			t24px: { font: "24px ComicBook", fill: "#FFF", stroke: "#000", strokeThickness: 6 }
		};

		var opacityTable = [];
		for(var o=0; o<candyUnlockLevels.length; o++) {
			opacityTable[o] = 0.6;
		}
		for(var i=0; i<candyActualLevel; i++) {
			opacityTable[i] = 1;
		}

		this.add.sprite(134, 128, 'text-overall');
		this.add.sprite(290, 116, 'score-bg');
		var scoreText = this.add.text(400, 130, ""+totalscore, text.t40px);
		scoreText.x = 290+(213+75-scoreText.width)*0.5;
		this.add.text(20, 206, "Collect points to unlock new candy!", text.t32px);
		this.add.text(40, 246, "New candy is worth more points!", text.t32px);

		this.add.sprite(1, 300, 'achievement-marshmallow').alpha = opacityTable[0];
		this.add.text(20, 316, '10', text.t40px).alpha = opacityTable[0]; // 2 points
		this.add.sprite((Candy.GAME_WIDTH-321+2), 300, 'achievement-jelly').alpha = opacityTable[1];
		this.add.text(340, 158*2, '25', text.t40px).alpha = opacityTable[1]; // 3 points
		this.add.sprite(1, 195*2, 'achievement-donut').alpha = opacityTable[2];
		this.add.text(10*2, 203*2, '50', text.t40px).alpha = opacityTable[2]; // 4 points
		this.add.sprite((Candy.GAME_WIDTH-321+2), 195*2, 'achievement-cupcake').alpha = opacityTable[3];
		this.add.text(170*2, 203*2, '100', text.t32px).alpha = opacityTable[3]; // 5 points
		this.add.sprite(1, 240*2, 'achievement-pink').alpha = opacityTable[4];
		this.add.text(5*2, 249*2, '250', text.t32px).alpha = opacityTable[4]; // 6 points
		this.add.sprite((Candy.GAME_WIDTH-321+2), 480, 'achievement-lollipop').alpha = opacityTable[5];
		this.add.text(165*2, 249*2, '500', text.t32px).alpha = opacityTable[5]; // 7 points
		this.add.sprite(1, 285*2, 'achievement-icecream').alpha = opacityTable[6];
		this.add.text(10*2, 295*2, '1K', text.t32px).alpha = opacityTable[6]; // 8 points
		this.add.sprite((Candy.GAME_WIDTH-321+2), 285*2, 'achievement-teddy').alpha = opacityTable[7];
		this.add.text(170*2, 295*2, '2K', text.t32px).alpha = opacityTable[7]; // 9 points
		this.add.sprite(1, 330*2, 'achievement-cake').alpha = opacityTable[8];
		this.add.text(5*2, 340*2, '5K', text.t32px).alpha = opacityTable[8]; // 10 points
		this.add.sprite((Candy.GAME_WIDTH-321+2), 660, 'achievement-chocolate').alpha = opacityTable[9];
		this.add.text(165*2, 340*2, '10K', text.t32px).alpha = opacityTable[9];; // 11 points
		this.add.sprite(1, 375*2, 'achievement-crown').alpha = opacityTable[10];
		this.add.text(5*2, 385*2, '25K', text.t32px).alpha = opacityTable[10];
		this.add.sprite((Candy.GAME_WIDTH-321+2), 375*2, 'achievement-cape').alpha = opacityTable[11];
		this.add.text(165*2, 385*2, '50K', text.t32px).alpha = opacityTable[11];
		this.add.sprite(((Candy.GAME_WIDTH-243*2)/2), 418*2, 'achievement-win');
		this.add.text(50*2, 428*2, '100 000', text.t32px); // 100K = win
	}
};