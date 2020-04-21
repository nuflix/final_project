let slider = document.getElementById("slider");
let sliderPage = 0;
let apiKey = "IcvHwuaZZxwGBTQF0z3zXAcI";
slider.addEventListener("click", sliderClick);

function apiSlider(){

    fetch(`https://api.bestbuy.com/v1/products(releaseDate<=today)?apiKey=${apiKey}&format=json&show=sku,name,shortDescription,image,regularPrice,salePrice,releaseDate,type&pageSize=9&page=1,customerReviewAverage&sort=releaseDate.dsc`)
    .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      }).then((productsLocal) => {

        //here we call functions that need argument product list
        loadSlider(productsLocal.products);
        return 0;

      }).catch(error => alert(error.toString()));
  
    
    }

function loadSlider(sliderProducts){
    for(let i=0; i<9;i++){
        if(i<3){
        document.getElementById("slider").innerHTML += `<div class="sliderBox visibleSliderProduct"><img src="${sliderProducts[i].image}" class="sliderImage" /><div class="sliderClick" data-image-id="${i}"></div></div>`;
        }else{
            document.getElementById("slider").innerHTML += `<div class="sliderBox"><img src="${sliderProducts[i].image}" class="sliderImage" /><div class="sliderClick" data-image-id="${i}"></div></div>`;    
        }   
    }
}

function sliderClick(){
    if(event.target.classList.contains("sliderClick")){
        sliderDetails(event.target.dataset.imageId);
    }
}

function sliderDetails(x){
    alert(x)
}

function nextSliderPage(){
    let visibleSliderProduct = document.getElementsByClassName("sliderBox");
    for(let i=0; i<visibleSliderProduct.length;i++){
        if(visibleSliderProduct[i].classList.contains("visibleSliderProduct")){
        visibleSliderProduct[i].classList.remove("visibleSliderProduct");
        }
    }
    if(sliderPage<2){
        sliderPage++;
    }else{
        sliderPage=0;
    }
    for(let i=0; i<3;i++){
        let count = sliderPage*3+i;
        visibleSliderProduct[count].classList.add("visibleSliderProduct");
    }

}


function previousSliderPage(){
    let visibleSliderProduct = document.getElementsByClassName("sliderBox");
    for(let i=0; i<visibleSliderProduct.length;i++){
        if(visibleSliderProduct[i].classList.contains("visibleSliderProduct")){
        visibleSliderProduct[i].classList.remove("visibleSliderProduct");
        }
    }
    if(sliderPage>0){
        sliderPage--;
    }else{
        sliderPage=2;
    }
    for(let i=0; i<3;i++){
        let count = sliderPage*3+i;
        visibleSliderProduct[count].classList.add("visibleSliderProduct");
    }

}

apiSlider();



