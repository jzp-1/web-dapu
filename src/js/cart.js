require(["./requirejs.config"],()=>{
	require(["jquery","template","cookie","header","footer"],($,template)=>{
		class Cart{
			constructor(){
				this.init();
			}
			init(){
				let _this=this;	
				if(!$.cookie("good")){
					$(".emptyCart").addClass("ac");
					$(".notEmpty").removeClass("ac");
					$(".totalPrice").removeClass("ac");
				}else{
					$(".notEmpty").addClass("ac");
					$(".totalPrice").addClass("ac");
					$(".emptyCart").removeClass("ac");
					//取cookie 渲染
					let list=JSON.parse($.cookie("good"));
					let html = template("form-cart-template", {list: list});
					$("#form-cart tbody").html(html);
					for(let i=0;i<$("tbody input[type=checkbox]").length;i++){
						$("tbody input[type=checkbox]").eq(i).prop("checked",true)
					}
					this.num();
					this.calc();
				}
				$(".cartTitle a").on("click",()=>{
					this.clearAll();
				})
				$(".delBtn").on("click",function(e){
					e.preventDefault();
					let index=$(this).index(".delBtn");
					_this.del(index);
				})
				
				//给选择框绑点击事件 每次点击循环判断是否选中所有 以及是否全不选
				$("tbody input[type=checkbox]").on("click",function(){
					let count=0;
					let m=$("tbody input[type=checkbox]").length;
					for(let i=0;i<$("tbody input[type=checkbox]").length;i++){
						if($("tbody input[type=checkbox]").eq(i).prop("checked")){
							count++;
						}else{
							m--;
						}
					}
					if(count===$("tbody input[type=checkbox]").length){
						$("thead input[type=checkbox]").eq(0).prop("checked",true);
					}
					if(m===0){
						$("thead input[type=checkbox]").eq(0).prop("checked",false);
					}
					_this.calc();
				})
				//给全选反选绑事件
				$("thead input[type=checkbox]").eq(0).on("click",function(){
					if($("thead input[type=checkbox]").eq(0).prop("checked")){
						for(let i=0;i<$("tbody input[type=checkbox]").length;i++){
							$("tbody input[type=checkbox]").eq(i).prop("checked",true);
							_this.calc();
						}
					}else{
						for(let j=0;j<$("tbody input[type=checkbox]").length;j++){
							$("tbody input[type=checkbox]").eq(j).prop("checked",false);
							_this.calc();
						}
					}
				})
				//给结算按钮绑事件
				$(".goPay").on("click",function(e){
					e.preventDefault();
					if($.cookie("user")!=undefined){
						location.href="/html/pay.html";
					}else{
						alert("请先登录");
						location.href="/html/login.html";
					}
				})
			}
			num(){
				//数量加减
				let _this=this;
				$(".input-group-prepend").on("click",function(){
					let index=$(this).next().attr("data-index")
					let num=Number($(this).next().val())
					num=--num<1?1:num
					$(this).next().val(num);
					_this.change(index);
				})
				$(".input-group-append").on("click",function(){
					let index=$(this).prev().attr("data-index")
					let num=Number($(this).prev().val())
					$(this).prev().val(++num);
					_this.change(index);
				})
				//数量改变修改cookie 
				$(".good-number").on("change",function(){
					let reg=/^\d{1,}$/;
					let index=$(this).attr("data-index")
					if(!reg.test($(this).val())){
						alert("你输入的不是数量");
					}
					_this.change(index);
				})
				return this;
			}
			change(index){
				let jsonArr=JSON.parse($.cookie("good"));
				jsonArr[index].num=$(".good-number").eq(index).val();
				$.cookie("good",JSON.stringify(jsonArr),{path:"/"});
				this.calc();
			}
			calc(){
				let arr=JSON.parse($.cookie("good"));
				let productMoney=0;
				let totalMoney=0;
				let dePrice=0;
				let checkedBox=[];
				for(let j=0;j<$("tbody input[type=checkbox]").length;j++){
					if($("tbody input[type=checkbox]").eq(j).prop("checked")){
						checkedBox.push(j);
					}
				}
				for(let i=0;i<checkedBox.length;i++){
					let money=Number(arr[i].num)*Number(arr[i].price);
					totalMoney+=money;
					money=money.toFixed(2);
					$(".good-total-price").eq(i).html(money);
				}
				productMoney=totalMoney-dePrice;
				totalMoney=totalMoney.toFixed(2);
				$("#totalMoney").html(totalMoney);
				productMoney=productMoney.toFixed(2)
				$("#productMoney").html(productMoney);
			}
			clearAll(){
				$.removeCookie("good");
				this.init();
			}
			del(index){
				//删除对应cookie重新渲染
				let jsonArr=JSON.parse($.cookie("good"));
				jsonArr.splice(index,1);
				if(JSON.stringify(jsonArr)==="[]"){
					$.removeCookie("good");
					this.init();
				}else{
					$.cookie("good",JSON.stringify(jsonArr),{path:"/"});
					this.init();
				}
			}
		}
		return new Cart();
	})
})