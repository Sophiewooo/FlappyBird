(function(){
	//静态资源管理类
	window.StaticResourcesUtil = Class.extend({
		init: function(){
			this.images = {};
		},
		loadImages: function(jsonURL,callback){
			var self = this;
			//ajax三步走，请求json数据
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4){
					if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
						var alreadyLoadNum = 0;
						//转换为json对象
						var jsonObj = JSON.parse(xhr.responseText);
						for(var i = 0; i < jsonObj.images.length; i++){
							var image = new Image();
							//src属性设置后，立即发出加载图片的Http请求
							image.src = jsonObj.images[i].src;
							image.index = i;
							image.onload = function(){
								alreadyLoadNum++;
								self.images[jsonObj.images[this.index].name] = this;
								callback(alreadyLoadNum, jsonObj.images.length, self.images);
							};
						}
					}
				}
			}
			xhr.open("get",jsonURL,true);
			xhr.send(null);
		}
	});
})();
