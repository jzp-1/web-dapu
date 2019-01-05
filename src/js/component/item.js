define(["jquery","template"],($,template)=>{
	function Item(){
		
	}
	Item.prototype.init=function(url){
		new Promise((resolve,reject)=>{
			$("#list-item").load("/html/component/item.html",()=>{
				resolve();
			})
		}).then(()=>{
			console.log(123)
			$.ajax({
				url: url,
				type: "get",
				success: function(res){
					console.log(res)
					if(res.res_code===1){
						let list =res.res_body.data;
						let html=template("list-template",{list:list})
						$("#list-item ul").html(html);
					}
				}
			})
		})
	}
	return new Item();
})