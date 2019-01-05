define(["jquery","header"], () => {
	$.fx.interval=50;
	 class runPic{
	 	constructor(id){
	 		this.id=id;
	 		this.ele=$("#"+this.id);
	 		this.aImg=$(`#${this.id} ul li`);
	 		this.len=this.aImg.length;
	 		this.index=0;
	 		this.aBtn=[];
	 		this.ol=$(`#${this.id} ol`);
	 		this.ul=$(`#${this.id} ul`);
	 		this.liWidth=this.aImg[0].offsetWidth;
	 		this.flag=true;
	 	}
	 	init(){
	 		//初始化创建按钮和clone第一张图片
	 		this.creatBtn(this.len);
	 		$(this.aImg[0]).clone().appendTo(this.ul);
	 		for(let i=0;i<this.aBtn.length;i++){
				this.aBtn[i].onclick=()=>{
					this.clickChange(i);
					this.index=i;
				}
			}
	 		this.ul.width((this.len+1)*this.liWidth);
	 		return this;
	 	}
	 	creatBtn(length){
	 		for(let i=0;i<length;i++){
				this.li=document.createElement("li");
				//默认第一个按钮样式改变
				this.li.className=i===0?"ac":"";
				this.aBtn.push(this.li);
				$(this.li).appendTo(this.ol);
			}
			return this;
	 	}
	 	clickChange(index){
			//循环清空样式
			for(let i=0;i<this.aBtn.length;i++){
				this.aBtn[i].className="";
			}
			this.aBtn[index].className="ac";
			this.ul.stop().animate({left:-index*this.liWidth});
			this.index=index;
			return this;
		}
	 	autoPlay(){
			clearInterval(this.timer);
			this.timer=setInterval(()=>{
				if(this.flag){
					this.flag=false;
					this.aBtn[this.index].className="";
					this.index++;
					if(this.index===this.len){
						this.ul.stop().animate({left:-this.index*this.liWidth},()=>{
							this.ul.css({left:0});
							this.flag=true;
						});
						this.index=0;
					}else{
						this.ul.stop().animate({left:-this.index*this.liWidth},()=>{
							this.flag=true;
						});
					}
					this.aBtn[this.index].className="ac";
				}	
			},2000);
			return this;
		}
	}
	return new runPic("banner").init().autoPlay()
})

