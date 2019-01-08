require.config({
	baseUrl: "/",
	paths: {
		"jquery": "libs/jquery/jquery-1.11.3.min",
		"cookie": "libs/jquery/jquery-plugins/jquery.cookie",
		"header": "js/component/header",
		"footer": "js/component/footer",
		"carousel": "js/component/carousel",
		"url": "js/component/url",
		"template": "libs/template-web",
		"item": "js/component/item",
		"exzoom": "libs/jquery/jquery-exzoom/jquery.exzoom"
		
	},
	//不符合amd规范的模块 垫片
	shim: {
		"cookie": {
			deps: ["jquery"]
		},
		"exzoom": {
			deps: ["jquery"]
		}
	}
	
})