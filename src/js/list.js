require(["./requirejs.config"],()=>{
	require(["jquery","item","url","header","footer"],($,item,url)=>{
		console.log(item)
		item.init(url.baseUrlRap+"/goodlist");
	})
})
