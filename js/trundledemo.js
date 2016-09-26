;(function($){
	var trundleDemo = function(){
		var self = this;

		//保存轮播框
		this.templetRolling=$(".templet-rolling")
		//保存图片包裹层
        this.wrapRolling = $(".wrap-rolling");
        //保存单个pic-rolling 图片
        this.picRolling = $(".pic-rolling");
        //保存导航条
        this.promoNav=$(".promo-nav");
        this.promoHint= $(".promo-hint");
        //保存切换按钮
        this.nextBtn = $(".btn-rolling-next");
        this.prevBtn = $(".btn-rolling-prev");

        this.rotateFlag   = true;
		//图片包裹框参数
		this.wrapSetting={
		                 "width":900,
		                 "heigth":500,
		                 "speed":4000,
		                 "autoPlay":false
		        };
        $.extend(this.wrapSetting,this.getwrapSetting());

        //渲染新建DOM,并插入到相应位置
        this.renderDOM();
        //获取新建导航按钮
        this.navHint();
        //设置picrolling参数
        this.setPicrolling();
        //将显示图片和对应按钮绑定，并设置按钮的背景色
               
        //初始化第一张图片状态
        $(!function(){
        	self.picRolling.first().addClass("activePic");
        	self.promoHint.first().addClass("activeHint");
        }());
        //添加按钮事件
        //向后
        this.nextBtn.click(function(){
        	if(self.rotateFlag){
        		self.rotateFlag = false;
        		self.goTo("next");
        	};
        });
        //向前
        this.prevBtn.click(function(){
        	if(self.rotateFlag){
        		self.rotateFlag = false;
        		self.goTo("prev");
        	};
        });
        //自动播放开启
        if(this.wrapSetting.autoPlay){
        	this.autoPlay();
        	this.templetRolling.hover(function(){
						        		window.clearInterval(self.timer);
						        	},function(){
						        		self.autoPlay();
						        	});
        };
        //导航按钮点击事件绑定
        this.promoHint.click(function(){
        	var _this_ = this;
        	var i = $(this).index();
        	window.clearInterval(self.timer);
        	if($(".activePic").index()===i){
        		return false;
        	}else{
        		$(this).siblings().removeClass("activeHint");
        		self.promoHint.eq(i).addClass("activeHint");
        		$(".activePic").fadeOut().removeClass("activePic");
        		self.picRolling.eq(i).fadeIn().addClass("activePic");
        	};
        });

	};//terudleDemo结束

	//原型
	trundleDemo.prototype={
		//获取新建导航按钮
		navHint:function(){
			this.promoHint = $(".promo-hint");
		},
		//设置自动滚动
		autoPlay:function(){
			var self= this;
			this.timer = window.setInterval(function(){
				self.nextBtn.click();
			},this.wrapSetting.speed);
		},//autoPlay结束

		//设置按钮事件
		goTo:function(dir){
			var _this_ = this;
			//保存当前显示图片
        	this.activePic = $(".activePic");
			var num = this.activePic.index();
			if(dir==="next"){
				if(num<rollingNum-1){
					num ++;
				}else{
					num = 0;
				};
				var nextHint = _this_.promoHint.eq(num);//对应索引的hint
			    nextHint.siblings().removeClass("activeHint");
				nextHint.addClass("activeHint");
				var next = this.activePic.next().get(0)?this.activePic.next():_this_.picRolling.first();
				this.activePic.fadeOut().removeClass("activePic");
				next.fadeIn().addClass("activePic");
				_this_.rotateFlag = true;
			}else if(dir==="prev"){
				if(num>0){
					num = num-1;
				}else{
					num = rollingNum-1;
				};
				var prevHint = _this_.promoHint.eq(num);//对应索引的上一个hint
				prevHint.siblings().removeClass("activeHint");
				prevHint.addClass("activeHint");
				var prev = this.activePic.prev().get(0)?this.activePic.prev():_this_.picRolling.last();
				this.activePic.fadeOut().removeClass("activePic");
				prev.fadeIn().addClass("activePic");
				_this_.rotateFlag = true;
			};
		},//goTo结束

		//获取参数
		getwrapSetting:function(){
			var wrapSetting = this.wrapRolling.attr("data-setting");
				if(wrapSetting&&wrapSetting!=""){
				return $.parseJSON(wrapSetting);
				}else{
				return {};
				alert("未设置轮播图片参数，将采用默认参数：宽度：800px;高度：300px;");
				};
		},//getwrapSetting结束

		//插入导航条
		renderDOM:function(){
			this.promoNav.empty();
			//获取pic-rolling的数量
			arr = this.picRolling.toArray();
			rollingNum = arr.length;
			//创建引导点，并插入导航栏
			var strNav = '<span class="promo-hint"></span>';
			strDom = "";
			for(var i=0;i < rollingNum;i++){
			strDom =strDom+ strNav;
			};
			this.promoNav.html(strDom);
	    },//renderDOM结束

	    //设置参数
	    setPicrolling:function(){
	    	this.picRolling.css({
	    		width:this.wrapSetting.width,
	    		height:this.wrapSetting.height
	    	});
	    	this.wrapRolling.css({
	    		width:this.wrapSetting.width,
	    		height:this.wrapSetting.height
	    	});
	    	this.templetRolling.css({
	    		width:this.wrapSetting.width,
	    		height:this.wrapSetting.height
	    	});
	    	this.promoNav.css({
	    		left:(this.wrapSetting.width-rollingNum*26)/2
	    	});

	    },//设置参数结束

	};//原型结束

	//将trundleDemo注册到全局
  window["trundleDemo"] = trundleDemo;
})(jQuery);