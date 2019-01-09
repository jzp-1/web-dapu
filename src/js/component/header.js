//加载header

define(["jquery","cookie"], () => {
	class Header{
		constructor(){
			this.init();
		}
		init(){
			//加载header.html
			$("header").load("/html/component/header.html",()=>{
				this.nav();
				this.userLogin();
				this.exit();
				if($.cookie("good")){
					let goodInfo=JSON.parse($.cookie("good"));
					let totalNum=0;
					for(let i=0;i<goodInfo.length;i++){
						totalNum+=Number(goodInfo[i].num);
					}
					totalNum=totalNum.toString();
					$("#totalNum").html(totalNum);
				}
			});
			
		}
		nav(){
			$(".nav-one li").on("mouseenter",function(){
				if($(this).index()!=0&&$(this).index()!=10){
					$(".nav-box").eq($(this).index()-1).css({"display": "block"})
				}
			});
			$(".nav-box").on("mouseenter",function(){
				$(this).css({"display":"block"})
			});
			$(".nav-box").on("mouseleave",function(){
				$(this).css({"display":"none"})
			});
			$(".nav-one li").on("mouseleave",function(){
				if($(this).index()!=0&&$(this).index()!=10){
					$(".nav-box").eq($(this).index()-1).css({"display": "none"})
				}
			})
		}
		userLogin(){
			if($.cookie("user")!=undefined){
				$("#user").html($.cookie("user"));
				$("#user").attr({"href": "javascript:;"});
				$("#exit").html("退出")
				$("#exit").attr({"href": "javascript:;"})
				$(".login").css({"width":150})
			}
		}
		exit(){
			$("#exit").on("click",function(){
				$.removeCookie("user");
				$("#user").html("登录");
				$("#user").attr({"href":"/html/login.html"});
				$("#exit").html("注册");
				$("#exit").attr({"href": "/html/register.html"});
				$(".login").css({"width":100});
			})
		}
	}
	return new Header();
})