
require(["./requirejs.config"],()=>{
	require(["jquery","url","template","cookie","header","footer","carousel"],($,url,template)=>{
		class Index{
			constructor(){
				this.init()
			}
			init(){
				//渲染新品
				$.ajax({
		        url:url.baseUrlRap+"/newPro",
		        type:"GET",
		        dataType:"json",
		        success: function(res){
		          if(res.res_code ==1){
						let list = res.res_body.data;
						let html = template("newProList-template", {list: res.res_body.data});
						$("#newProList").html(html);
						//渲染成功后给隐藏盒子设置效果
						$("#newProList a").on("mouseenter",function(){
							let boxWidth=$(this).css("width");
							$(this).children(".infoBox").css({"width":boxWidth}).stop().animate({opacity:1,height:48},200)
						})
						$("#newProList a").on("mouseleave",function(){
							$(this).children(".infoBox").stop().animate({opacity:0,height:0},200)
						})
					}
		        }
		     })
			$.ajax({
		        url:url.baseUrlRap+"/hotProduct",
		        type:"GET",
		        dataType:"json",
		        success: function(res){
	         		if(res.res_code ==1){
						let list = res.res_body.data;
						let html = template("hot-template", {list: res.res_body.data});
						$("#hot").html(html);
						$("#hot a").on("mouseenter",function(){
							let boxWidth=$(this).css("width");
							$(this).children(".infoBox").css({"width":boxWidth}).animate({opacity:1,height:48},200)
						})
						$("#hot a").on("mouseleave",function(){
							$(this).children(".infoBox").animate({opacity:0,height:0},200)
						})
		        	}
	         	}
		    })
			$.ajax({
		        url:url.baseUrlRap+"/hotProduct1",
		        type:"GET",
		        dataType:"json",
		        success: function(res){
	         		if(res.res_code ==1){
						let list = res.res_body.data;
						let html = template("hotTwo-template", {list: res.res_body.data});
						$("#hotTwo").html(html);
						$("#hotTwo a").on("mouseenter",function(){
							let boxWidth=$(this).css("width");
							$(this).children(".infoBox").css({"width":boxWidth}).animate({opacity:1,height:48},200)
						})
						$("#hotTwo a").on("mouseleave",function(){
							$(this).children(".infoBox").animate({opacity:0,height:0},200)
						})
		        	}
	         	}
		    })	
				
				$("#topBtn").on("click",function(e){
					e.preventDefault();
					$("html,body").animate({scrollTop:0},1000)
				})	
			}
			animate(){
				
			}
		}
		return new Index();
	})
})
