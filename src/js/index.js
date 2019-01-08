
require(["./requirejs.config"],()=>{
	require(["jquery","cookie","header","footer","carousel"],()=>{
		class Index{
			constructor(){
				this.init()
			}
			init(){
				$("#topBtn").on("click",function(e){
					e.preventDefault();
					$("html,body").animate({scrollTop:0},1000)
				})
			}
		}
		return new Index();
	})
})
