(function(){
	window.Bird = Class.extend({
		init: function(){
			this.w = 57 * game.scale;
			this.h = 40 * game.scale;
			this.x = (game.canvas.width - this.w) / 2;
			this.y = game.canvas.height / 3;
			//翅膀的状态，合法值0，1，2
			this.swing = 0;
			this.dy = 0;
			this.dropSpeed = 0.3 * game.scale;
			this.startFrame = game.frameUtil.currentFrame;
			this.ro = 0;
			this.bindClickListener();
			//下降是0，上升是1
			this.state = 0;
			this.swingSpeed = 5;
			this.die = false;
			this.dieAnimate = 0;
			this.touchFloor = false;
		},
		render: function(){
			if(this.die){
				if(this.touchFloor){
					game.ctx.drawImage(game.images.die, 0, 0, 80, 60, game.canvas.width / 2 - 20 * game.scale, this.y + this.h - 15 * game.scale, 40 * game.scale, 30 * game.scale);
					game.pause();
				}else{
					var row = parseInt(this.dieAnimate / 5);
					var col = this.dieAnimate % 5;
					game.ctx.drawImage(game.images.blood, 325 * col, 138 * row, 325, 138, game.canvas.width / 2 - 81.25 * game.scale, this.y + this.h / 2, 162.5 * game.scale, 69 * game.scale);
				}
			}
			game.ctx.save();
			game.ctx.translate(game.canvas.width / 2, this.y + this.h / 2);
			game.ctx.rotate(Math.PI / 180 * this.ro);
			game.ctx.translate(-(game.canvas.width / 2), -(this.y + this.h / 2));
			game.ctx.drawImage(game.images.bird, this.swing * 92, 0, 92, 64, this.x, this.y, this.w, this.h);
			game.ctx.restore();
		},
		fly: function(){
			this.state = 1;
			this.startFrame = game.frameUtil.currentFrame;
			this.swingSpeed = 1;
			this.ro = -30;
		},
		update: function(){
			if(this.y >= game.canvas.height - 35 * game.scale - this.h){
				game.gameover();
				this.touchFloor = true;
				return;
			}
			if(this.die){
				if(this.dieAnimate < 30){
					this.dieAnimate++;
				}
				this.ro = 90;
				this.dy++;
				this.y += this.dy;
				return;
			}
			if(this.state == 0){
				this.dy = this.dropSpeed * (game.frameUtil.currentFrame - this.startFrame);
			}else if(this.state == 1){
				this.dy = (-14 + (game.frameUtil.currentFrame - this.startFrame)) * game.scale;
				if(this.dy >= 0){
					this.state = 0;
					this.startFrame = game.frameUtil.currentFrame;
					this.swingSpeed = 5;
				}
			}
			this.y += this.dy;
			if(this.ro < 90){
				this.ro++;
			}
			if(game.frameUtil.currentFrame % this.swingSpeed == 0){
				this.swing++;
				if(this.swing > 2){
					this.swing = 0;
				}
			}
		},
		bindClickListener: function(){
			var self = this;
			game.canvas.addEventListener("mousedown", function(){
				self.fly();
			});
			game.canvas.addEventListener("touchstart", function(event){
				event.preventDefault();
				self.fly();
			});
		},
	});
})();
