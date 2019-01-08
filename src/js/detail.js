require(["./requirejs.config"],()=>{
	require(["jquery","url","template","cookie","header","footer","exzoom"],($,url,template)=>{
		
		$(function(){
	      //获取id
	      let arrSearch = location.search.slice(1).split("=");
	      let searchObj = {};
	      searchObj[arrSearch[0]] = arrSearch[1];
		  $("#tab-nav li").on("click",function(){
		  	let liIndex= $("#tab-nav li").index($(this))
		  	console.log(liIndex)
		  	$("#goodsDetailContent").children().eq(liIndex).addClass("ac").siblings().removeClass("ac")
		  })
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