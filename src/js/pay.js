require(["./requirejs.config"],()=>{
	require(["jquery","template","cookie"],($,template)=>{
		class Pay{
			constructor(){
				this.init();
			}
			init(){
				let list=JSON.parse($.cookie("good"));
				let html = template("payBox-template", {list: list});
				$("#payBox tbody").html(html);
				this.calc();
			}
			calc(){
				let arr=JSON.parse($.cookie("good"));
				let productMoney=0;
				let totalMoney=0;
				let dePrice=0;
				for(let i=0;i<arr.length;i++){
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
		}
		return new Pay();
	})
})