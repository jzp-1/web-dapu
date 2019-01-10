require(["./requirejs.config"],()=>{
	require(["jquery","url","template","cookie","header","footer","exzoom"],($,url,template)=>{
		
		$(function(){
	      //获取id
	      let arrSearch = location.search.slice(1).split("=");
	      let searchObj = {};
	      searchObj[arrSearch[0]] = arrSearch[1];
	      //介绍卡切换
		  $("#tab-nav li").on("click",function(){
		  	let liIndex= $("#tab-nav li").index($(this))
		  	$("#goodsDetailContent").children().eq(liIndex).addClass("ac").siblings().removeClass("ac")
		  })
		  //渲染放大镜
	      $.ajax({
	        url:url.baseUrlRap+"/pro-pic",
	        type:"GET",
	        data: searchObj,
	        dataType:"json",
	        success: function(res){
	          if(res.res_code ==1){
					let list = res.res_body.data;
					//通过模板引擎渲染结构
					let html = template("exzoom-template", {list: res.res_body.data});
					$("#exzoom ul").html(html);
					$("#exzoom").exzoom({
				        autoPlay: false
				   })
				}
	        }
	      })
	      //渲染信息页
			$.ajax({
	        url:url.baseUrlRap+"/detail",
	        type:"GET",
	        data: searchObj,
	        dataType:"json",
	        success: function(res){
	          if(res.res_code ==1){
					let list = res.res_body.data;
					//通过模板引擎渲染结构
					let html = template("product-template", {list: res.res_body.data});
					$("#product-info").html(html);
					//渲染成功后把当前商品信息存入cookie方便渲染浏览过的商品
					let see={};
					see.img=list.img;
					see.id=arrSearch[1];
					see.name=list.name;
					let seeArr=$.cookie("see")?JSON.parse($.cookie("see")):[];
					let index;
					let isExit=seeArr.some(function(item,i){
						index=i;
						return item.id===see.id;
					})
					if(!isExit){
						seeArr.push(see);
					}
					$.cookie("see",JSON.stringify(seeArr));
					//评论数根据数据改变 完整渲染需要再给个接口 这里就简单实现数量看起来相等
					$("#talkNum").html("("+$(".talkNum").html()+")");
					//选择颜色和尺寸
					$("#pro-color span").on("click",function(){
						$("#pro-color span").each(function(index){
							$("#pro-color span").eq(index).removeClass("selected")
						})
						$(this).addClass("selected")
					})
					$("#pro-size span").on("click",function(){
						$("#pro-size span").each(function(index){
							$("#pro-size span").eq(index).removeClass("selected")
						})
						$(this).addClass("selected")
					})
					//数量的加减
					
					$("#deNum").on("click",function(){						
						let goodNum=Number($("#goodNum").val());
						if(--goodNum<1){
							$("#goodNum").val(1)
						}else{
							$("#goodNum").val(goodNum);
						}
					})
					$("#inNum").on("click",function(){						
						let goodNum=Number($("#goodNum").val());
						$("#goodNum").val(++goodNum);
					})
					//给加入购物车绑事件 存cookie
					$(".btn-buy").on("click",function(){
						let good={};
						good.id=arrSearch[1];
						good.img=list.img;
						good.num=Number($("#goodNum").val());
						good.color=$("#pro-color .selected nobr").html();
						good.size=$("#pro-size .selected nobr").html();
						good.price=list.price;
						good.vipPrice=list.vip_price;
						good.name=list.name;
						if(good.size===undefined||good.size===undefined){
							alert("请选择颜色和尺寸")
						}else{
							//判断有没有cookie没有就存 有就加
							let goodArr=$.cookie("good")?JSON.parse($.cookie("good")):[];
							let index;
							let isExit=goodArr.some(function(item,i){
								index=i;
								return item.id===good.id&&item.size===good.size&&item.color===good.color;
							})
							//如果有同id改为增加num
							if(isExit){
								goodArr[index].num+=good.num;
							}else{
								goodArr.push(good);
							}
							$.cookie("good",JSON.stringify(goodArr));
							console.log($.cookie("good"));
							if(confirm("添加成功，立即去结算？")){
								location.href="/html/cart.html"
							}
						}
					})
				}
	        }
	      })
			$.ajax({
		        url:url.baseUrlRap+"/hotPro",
		        type:"GET",
		        dataType:"json",
		        success: function(res){
		          if(res.res_code ==1){
						let list = res.res_body.data;
						//通过模板引擎渲染结构
						let html = template("hotproduct-template", {list: res.res_body.data});
						$("#hotProduct").html(html);
					}
		        }
		      })
			$.ajax({
		        url:url.baseUrlRap+"/pro-com",
		        type:"GET",
		        data: searchObj,
		        dataType:"json",
		        success: function(res){
		          if(res.res_code ==1){
						let list = res.res_body.data;
						//通过模板引擎渲染结构
						let html = template("procomment-template", {list: res.res_body.data});
						$("#pro_comment tbody").html(html);
					}
		        }
		      })
			$.ajax({
		        url:url.baseUrlRap+"/pro-com",
		        type:"GET",
		        data: searchObj,
		        dataType:"json",
		        success: function(res){
		          if(res.res_code ==1){
						let list = res.res_body.data;
						//通过模板引擎渲染结构
						let html = template("procom-template", {list: res.res_body.data});
						$("#procomment-pic").html(html);
					}
		        }
		     })
			
	    })
		
	})
})