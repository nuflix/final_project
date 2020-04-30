document.getElementById("modalWindowX").addEventListener("click", closeModalWindow);

/* function api(){
    fetch('https://api.bestbuy.com/v1/products/8880044.json?show=sku,name,salePrice&apiKey=IcvHwuaZZxwGBTQF0z3zXAcI')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      document.getElementById("content").innerHTML=data.name;
    });
} */

function modalWindowShow(productCharacteristics){
  /* console.log(productCharacteristics); */ 
document.getElementById("modalWindowContainer").classList.remove("invisible");
let ratings = "";
if(productCharacteristics.customerReviewCount>0){
ratings = "Average rating: " + productCharacteristics.customerReviewAverage + " out of " + productCharacteristics.customerReviewCount + " ratings.";
}else{
ratings = "No ratings for this product." 
}
document.getElementById("modalWindowContent").innerHTML = `<img class="modalWindowImage" src="${productCharacteristics.image}" /><div class="modalWindowString">name: ${productCharacteristics.name}</div><div class="modalWindowString">Release date: ${productCharacteristics.releaseDate}</div><div class="modalWindowString">${ratings}</div><div class="modalWindowString">Regular price: ${productCharacteristics.regularPrice}</div><div class="modalWindowString">Sale price: ${productCharacteristics.salePrice}</div><div><div class="buyBtn">Buy!</div><div id="addToFavBtn" class="sliderDetailsBtn addToFavBtn">Add to favorites</div></div><div class="modalWindowString">description: ${productCharacteristics.longDescription}</div><div id="sku" class="invisible">${productCharacteristics.sku}</div>`;

document.getElementById("addToFavBtn").addEventListener("click", addToFavorites);
}

function closeModalWindow(){
  document.getElementById("modalWindowContainer").classList.add("invisible");  
  window.sliderMouseOver = 0;
}


function addToFavorites(){
  let sku = document.getElementById("sku").innerHTML;
  if (localStorage.getItem("favorites") === null) {
    let arr=[];
    arr.push(sku);
    localStorage.setItem("favorites", JSON.stringify(arr));
  }else{
    let arr = JSON.parse(localStorage.getItem("favorites"));
    console.log(arr);
    if(arr.includes(sku)){
    alert("Item already in favorites");
    }else{
      arr.push(sku);
      localStorage.setItem("favorites", JSON.stringify(arr));
    }
  }
}

/* api(); */