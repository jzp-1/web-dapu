require(["./requirejs.config"],()=>{
	require(["url","jquery","cookie","header","footer"],(url)=>{
		class Login{
			constructor(){
				this.init();
			}
			init(){
				$("input[type=text]").on("blur",function(){
					if($(this).val()===""){
						$(this).next().css({"display":"inline-block"})
					}else{
						$(this).next().css({"display":"none"})
					}
				})
				$("#loginBtn").on("click",function(){
					$.ajax({
						url: url.baseUrlPhp+"/api/v1/login.php",
						type: "post",
						data: {
							tel: $("#tel").val(),
							password: $("#password").val()
						},
						success: function(res){
							if(res.res_code==1){
								alert(res.res_message);
								$.cookie("user",res.res_body,{path:"/"})
								location.href="/index.html"
							}
						},
						dataType: "json"
					})
				})
			}
		}
		return new Login();
	})
})