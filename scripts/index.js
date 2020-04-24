
function api(){
    fetch('https://api.bestbuy.com/v1/products/8880044.json?show=sku,name,salePrice&apiKey=IcvHwuaZZxwGBTQF0z3zXAcI')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      document.getElementById("content").innerHTML=data.name;
    });
}

function modalWindowShow(productCharacteristics){
document.getElementById("modalWindowContainer").classList.remove("invisible");
document.getElementById("modalWindow").innerHTML = productCharacteristics.name;
}

api();