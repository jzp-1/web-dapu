//加载header
define(["jquery"], () => {
	class Footer{
		constructor(){
			this.init();
		}
		init(){
			//加载header.html
			$("footer").load("/html/component/footer.html .inner")
		}
	}
	return new Footer();
})