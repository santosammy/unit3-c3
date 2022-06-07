var ans=JSON.parse (localStorage.getItem("user"))||[];

var amount=ans.amount;

document.getElementById("wallet_balance").innerHTML=amount;
var purchased=[]
 async function pictures(){
    let url= await fetch (`https://masai-vouchers-api.herokuapp.com/api/vouchers`);
   let res= await url.json()
    mappingData( res[0].vouchers);
}
pictures();

let mappingData=( data)=>{
    // console.log('data:', data)
    data.forEach(el => {
        var list=document.getElementById("voucher_list");
        var row=document.createElement("div");
        row.setAttribute("class","voucher");
        var img=document.createElement("img");
        img.src=el.image;
        var p=document.createElement("p");
        p.innerText=el.name;
        var p1=document.createElement("p");
        p1.innerText=el.price;
        var btn=document.createElement("button");
        btn.innerText="Buy";
        btn.addEventListener("click",function(){
            buttons(el)
        })
        btn.setAttribute("class","buy_voucher")
        row.append(img,p,p1,btn);
        list.append(row)
        // console.log('el:', el.image)
    });
   
}

function buttons(el){
    console.log('el:', el.price)
    // console.log('el:', el)
    if(el.price<amount){
        // console.log('el:', el.price)
        alert("Hurray! purchase successful");
        amount=amount-el.price;
        console.log('amount:', amount);
        document.getElementById("wallet_balance").innerHTML=amount;
        purchased.push(el);
        localStorage.setItem("purchase",JSON.stringify(purchased));

    }
    else
    alert("Sorry! insufficient balance");
}