(function(){
	//背景类
	window.Background = Class.extend({
		init: function(params){
			this.image = params.image;
			this.imgWidth = params.imgWidth;
			this.imgHeight = params.imgHeight;
			this.width = params.width;
			this.height = params.height;
			this.y = params.y;
			this.speed = params.speed;
			//能平铺满画布的图片数，向上取整
			this.amount = Math.ceil(game.canvas.width / this.width);
			this.x = 0;
			
		},
		render: function(){
			for(var i = 0; i < this.amount * 2; i++){
				game.ctx.drawImage(this.image, 0, 0, this.imgWidth, this.imgHeight, this.x + this.width * i, this.y, this.width, this.height);
			}
		},
		update: function(){
			this.x -= this.speed;
			if(this.x <= -this.width * this.amount){
				this.x = 0;
			}
		},
		pause: function(){
			this.speed = 0;
		}
	});
})();
