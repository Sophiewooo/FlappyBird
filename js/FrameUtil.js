(function(){
	//帧工具类
	//提供当前的帧序号，提供当前真实的fps
	window.FrameUtil = Class.extend({
		//初始化
		init: function(){
			//当前帧序号
			this.currentFrame = 0;
			//起始帧
			this.sFrame = 0
			this.sTime = new Date();
			this.realFps = 50;
		},
		//更新，这个函数在mainloop中每帧执行
		update: function(){
			//当前帧序号自增1
			this.currentFrame++;
			var t = new Date();
			if (t - this.sTime >= 1000){
				this.realFps = this.currentFrame - this.sFrame;
				this.sFrame = this.currentFrame;
				this.sTime = t;
			}
		}
	});
})();
