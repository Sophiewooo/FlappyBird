(function(){
	window.Pipe = Class.extend({
		init: function(){
			this.w = 74 * game.scale;
			//两根管子之间的固定距离
			this.distance = game.canvas.height / 3;
			//向上和向下两根管子的总高度
			this.allHeightRange = game.canvas.height * 19 / 20 - this.distance;
			this.minHeight = game.canvas.height / 8;
			//0表示向上的管子，1表示向下的管子
			this.h0 = _.random(this.minHeight, this.allHeightRange - this.minHeight); 
			this.h1 = this.allHeightRange - this.h0;
			this.x = game.canvas.width;
			this.speed = 3 * game.scale;
		},
		render: function(){
			game.ctx.drawImage(game.images.pipe0, 0, 0, 148, this.h0 * 2 / game.scale, this.x, this.h1 + this.distance, this.w, this.h0);
			game.ctx.drawImage(game.images.pipe1, 0, 1664 - this.h1 * 2 / game.scale, 148, this.h1 * 2 / game.scale, this.x, 0, this.w, this.h1);
		},
		update: function(){
			this.x -= this.speed;
			if(this.x < -this.w){
				game.pipeArray = _.without(game.pipeArray, this);
			}
			//碰撞检测
			if(this.x >= game.bird.x - this.w + 10 * game.scale && this.x <= game.bird.x + game.bird.w - 10 * game.scale){
				if(game.bird.y >= this.h1 + this.distance - game.bird.h + 5 * game.scale || game.bird.y <= this.h1 - 5 * game.scale){
					game.gameover();
				}
			}
			//加分
			if(!this.lock && this.x < (game.canvas.width - game.bird.w)/2 - this.w){
				game.scoreManager.update();
				this.lock = true;				
			}
		},
		pause: function(){
			this.speed = 0;
		}
	});
})();
