require(["./requirejs.config"],()=>{
	require(["jquery","url","template","header","footer"],($,url,template)=>{
		class List{
			constructor(){
				this.init();
			}
			init(){
				let _this=this;
				let arrSearch = location.search.slice(1).split("=");
			    let searchObj = {};
			    searchObj[arrSearch[0]] = arrSearch[1];
				let showId=arrSearch[1].substring(0,1);
				//渲染浏览过的商品
				this.see();
				//给清除列表绑事件
				$("#clearList").on("click",function(e){
					e.preventDefault();
					$.removeCookie("see");
					_this.see();
				})
				//渲染列表页商品
				$.ajax({
					url: url.baseUrlRap+"/goodlist",
					type: "get",
					data: searchObj,
	       			dataType:"json",
					success: (res)=>{
						if(res.res_code===1){
							let list =res.res_body.data;
							this.list=list;
							let html=template("list-template",{list:list});
							$("#list-item ul").append(html);
							
							//侧边列表效果
							$(".sortList-ul").eq(showId-1).addClass("ac");
							$(".expand").on("click",function(){
								location.search="id="+($(".expand").index(this)+1);
							})
							_this.waterFall();
						}
					}
				})
				
			}
			waterFall(){
				let index=1;
				let liHeight=332;
				let arrSearch = location.search.slice(1).split("=");
				let searchObj = {};
			    searchObj[arrSearch[0]] = arrSearch[1];
				let showId=arrSearch[1].substring(0,1);
				$(window).on("scroll",(e)=>{
					e.preventDefault();
					if($(window).scrollTop()+$(window).outerHeight()>index*5*liHeight+200){
						index++;
						$.ajax({
							url: url.baseUrlRap+"/goodlist",
							type: "get",
							data: searchObj,
			       			dataType:"json",
							success: (res)=>{
								if(res.res_code===1){
									let list =res.res_body.data;
									this.list=list;
									let html=template("list-template",{list:list});
									$("#list-item ul").append(html);
								}
							}
						})
					}
				})	
			}
			see(){
				if($.cookie("see")!=undefined){
					let seeJson=JSON.parse($.cookie("see"));
					let seeHtml=template("seePro-template",{list:seeJson});
					$("#seePro ul").html(seeHtml);
				}else{
					$("#seePro ul").html("");
				};
			}
		}
		return new List();
	})
})
