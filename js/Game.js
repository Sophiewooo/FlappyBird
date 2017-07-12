(function(){
	//Game是核心类
	window.Game = Class.extend({
		init: function(paramsJSON){
			var self = this;
			this.gameend = false;
			//fps表示每秒多少帧，默认值60
			this.fps = paramsJSON.fps || 60;
			//我的帧工具
			this.frameUtil = new FrameUtil();
			this.canvas = document.getElementById(paramsJSON.canvasId);
			this.ctx = this.canvas.getContext("2d");
			this.images = null;
			this.sr = new StaticResourcesUtil();
			this.sr.loadImages("setup.json",function(alreadyLoadNum, allNum, imagesObj){
				//回调函数中的this指向window
				self.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
				self.ctx.font = "20px 黑体";
				self.ctx.fillText("正在加载 " + alreadyLoadNum + " / " + allNum, this.canvas.width / 2 - 70, this.canvas.height / 2 - 8);
				if(alreadyLoadNum == allNum){
					self.images = imagesObj;
					self.run();
				}
			});
			this.topScore = 0;
			this.scale = this.canvas.width / 480;
		},
		run: function(){
			//setInterval中函数的this指向window
			var self = this;
			//创建角色
			this.house = new Background({
				"image": this.images.house,
				"imgWidth": 300,
				"imgHeight": 256,
				"width": this.canvas.width / 2,
				"height": this.canvas.height / 4,
				"y": this.canvas.height * 7 / 10,
				"speed": 1
			});
			this.tree = new Background({
				"image": this.images.tree,
				"imgWidth": 300,
				"imgHeight": 216,
				"width": this.canvas.width / 2,
				"height": this.canvas.height / 5,
				"y": this.canvas.height * 3 / 4,
				"speed": 2
			});
			this.floor = new Background({
				"image": this.images.floor,
				"imgWidth": 48,
				"imgHeight": 48,
				"width": this.canvas.width / 15,
				"height": this.canvas.height / 20,
				"y": this.canvas.height * 19 / 20,
				"speed": 3
			});
			this.bird = new Bird();
			this.pipeArray = [];
			this.scoreManager = new ScoreManager();
			this.timer = setInterval(function(){
//				console.log(this);
				self.mainloop();
			}, 1000 / self.fps);
		},
		//主循环，每帧执行
		//需要计算实际帧率，因为主循环复杂时，一帧的执行时间变长，帧率下降
		mainloop: function(){
			this.frameUtil.update();
			//清屏
			this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
			this.house.render();
			this.house.update();
			this.tree.render();
			this.tree.update();
			this.floor.render();
			this.floor.update();
			if(!this.gameend && this.frameUtil.currentFrame % 96 == 0){
				this.pipeArray.push(new Pipe());
			}
			for(var i = 0; i < this.pipeArray.length; i++){
				//更新可能会影响正在遍历的数组的长度,所以必须先更新，再渲染，防止i=1时丢帧
				this.pipeArray[i].update();
				this.pipeArray[i].render();
			}
			this.bird.render();
			this.bird.update();
			this.scoreManager.render();
//			this.scoreManager.update();
			//打印fps
			this.ctx.font = "16px Consolas";
			this.ctx.fillText("FPS / " + this.frameUtil.realFps, 10, 20);
			//打印帧序号
			this.ctx.fillText("FNO / " + this.frameUtil.currentFrame, 10, 40);
			//打印最高分
			this.ctx.fillText("BEST SCORE / " + this.topScore, this.canvas.width - 125 - 9 * this.scoreManager.digits, 20);
		},
		//暂停游戏
		pause: function(){
			clearInterval(this.timer);
			$(this.canvas).one("mousedown", function(){
				game.gameend = false;
				game.run();
			});
			$(this.canvas).one("touchstart", function(){
				game.gameend = false;
				game.run();
			});
		},
		gameover: function(){
			//各种暂停
			this.house.pause();
			this.tree.pause();
			this.floor.pause();
			for(var i = 0; i < this.pipeArray.length; i++){
				this.pipeArray[i].pause();
			}
			//停止new出新的pipe对象
			this.gameend = true;
			this.bird.die = true;
		}
	});
})();
