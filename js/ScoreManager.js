(function(){
	window.ScoreManager = Class.extend({
		init: function(){
			this.score = 0;	
			this.digits = game.topScore.toString().length;
			this.x = game.canvas.width / 2 - 20;
		},
		render: function(){
			//遍历每一位，取出数字进行渲染
			for(var i = 0; i < this.digits; i++){
				//取出每一位数字
				var thisDigit = parseInt(this.score.toString().substr(i, 1));
				game.ctx.drawImage(game.images.number, thisDigit * 40, 0, 40, 57, this.x + i * 40 * game.scale, game.canvas.height / 8, 40 * game.scale, 57 * game.scale);
			}
		},
		//不是每帧更新，每过一根管子更新一次
		update: function(){
			this.score++;
			if(this.score > game.topScore){
				game.topScore = this.score;
			}
			//分数的位数
			this.digits = this.score.toString().length;
			//分数放置的起始位置
			this.x = game.canvas.width / 2 - this.digits * 20;
		}
	});
})();
