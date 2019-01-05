require(["./requirejs.config"],()=>{
	require(["url","jquery","header","footer"],(url)=>{
		class Test{
			constructor(){
				this.flag=false;
				this.init();
			}
			init(){
				$("#registerBtn").on("click",function(e){
					e.preventDefault();
					let telReg=/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
						picCodeReg=/[0-9]{4}/,
						mesCodeReg=/[0-9]{6}/,
						passwordReg=/^[\w_-]{6,16}$/;
						console.log(mesCodeReg.test($("#mesCode").val()))
					if(!telReg.test($("#tel").val())){
						$("#tel+span").css({"display":"block"})
					}else if(!mesCodeReg.test($("#mesCode").val())){
						$("#tel+span").css({"display":"none"})
						$("#mesCode+span").css({"display":"block"})
					}else if(!passwordReg.test($("#password").val())){
						$("#mesCode+span").css({"display":"none"})
						$("#password+span").css({"display":"block"})
					}else if(!$("#password").val()===$("#rePwd").val()){
						$("#password+span").css({"display":"none"})
						$("#rePwd+span").css({"display":"block"})
					}else{
						this.flag=true;
						console.log(this.flag);
						$.ajax({
							url: url.baseUrlPhp+"/api/v1/register.php",
							type: "post",
							data: {
								tel: $("#tel").val(),
								password: $("#password").val()
							},
							success: function(res){
								if(res.res_code==1){
									alert("注册成功，马上去登录");
									location.href="login.html"
								}else{
									alert("数据库错误")
								}
							},
							dataType: "json"
						})
					}
				})	
			}
		}
		return new Test();
		
	})
})