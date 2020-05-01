document.getElementById('best-bars').addEventListener('click', windowOpen);

function api(){
    fetch('https://api.bestbuy.com/v1/products/8880044.json?show=sku,name,salePrice&apiKey=IcvHwuaZZxwGBTQF0z3zXAcI')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      document.getElementById("content").innerHTML=data.name;
    });
}

  

fetch('https://api.bestbuy.com/v1/products(onSale=true&inStoreAvailability=true&customerReviewAverage%3E=4&type=movie)?format=json&pageSize=3&show=sku,name,longDescription,image,regularPrice,salePrice,releaseDate,type,customerReviewAverage,customerReviewCount&sort=salePrice&apiKey=IcvHwuaZZxwGBTQF0z3zXAcI&sort=salePrice.asc')
.then(response => {
  console.log(response);
  return response;
})
.then(function getJSON(response){
  return response.json();
})
.then(function(data){
  
  makeDiv(data.products);
  
});

function makeDiv( arr){
  document.getElementsByClassName("best-sidebar-item")[0].getElementsByClassName("sidebar-title")[0].innerHTML = arr[0].name ;
  document.getElementsByClassName("best-sidebar-item")[0].getElementsByClassName("image")[0].src = arr[0].image;
  document.getElementsByClassName("best-sidebar-item")[0].getElementsByClassName("price")[0].innerHTML = arr[0].salePrice + "$";

  document.getElementsByClassName("best-sidebar-item")[1].getElementsByClassName("sidebar-title")[0].innerHTML = arr[1].name;
  document.getElementsByClassName("best-sidebar-item")[1].getElementsByClassName("image")[0].src = arr[1].image;
  document.getElementsByClassName("best-sidebar-item")[1].getElementsByClassName("price")[0].innerHTML = arr[1].salePrice + "$";

  document.getElementsByClassName("best-sidebar-item")[2].getElementsByClassName("sidebar-title")[0].innerHTML = arr[2].name;
  document.getElementsByClassName("best-sidebar-item")[2].getElementsByClassName("image")[0].src = arr[2].image;
  document.getElementsByClassName("best-sidebar-item")[2].getElementsByClassName("price")[0].innerHTML = arr[2].salePrice + "$";

  document.getElementsByClassName("best-sidebar-item")[0].getElementsByClassName("invisible")[0].innerHTML = JSON.stringify(arr[0]);
  document.getElementsByClassName("best-sidebar-item")[1].getElementsByClassName("invisible")[0].innerHTML = JSON.stringify(arr[0]);
  document.getElementsByClassName("best-sidebar-item")[2].getElementsByClassName("invisible")[0].innerHTML = JSON.stringify(arr[0]);
 
}


function windowOpen(){
  if(event.target.classList.contains("sidebar-title")){
   window.modalWindowShow(JSON.parse(event.target.parentNode.getElementsByClassName("invisible")[0].innerHTML));
   
  }
  if(event.target.classList.contains("image")){
    window.modalWindowShow(JSON.parse(event.target.parentNode.getElementsByClassName("invisible")[0].innerHTML));
    
   }

}