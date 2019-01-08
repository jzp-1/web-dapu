require(["./requirejs.config"],()=>{
	require(["jquery","item","url","template","header","footer"],($,item,url,template)=>{
		class List{
			constructor(){
				this.init();
			}
			init(){
				let index=1;
				let liHeight=332;
				let arrSearch = location.search.slice(1).split("=");
			    let searchObj = {};
			    searchObj[arrSearch[0]] = arrSearch[1];
				let showId=arrSearch[1].substring(0,1);
				console.log($(".sortList-ul").eq(showId-1))
				$(".sortList-ul").eq(showId-1).addClass("ac");
				$(".expand").on("click",function(){
						console.log($(".expand").index(this))
					location.search="id="+($(".expand").index(this)+1);
				})
				$(window).on("scroll",(e)=>{
					e.preventDefault();
					console.log(index*5*liHeight-30)
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
		}
		return new List();
	})
})
