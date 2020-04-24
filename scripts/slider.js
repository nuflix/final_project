let slider = document.getElementById("slider");
let sliderPage = 2;
let apiKey = "IcvHwuaZZxwGBTQF0z3zXAcI";
slider.addEventListener("click", sliderClick);
let currentSlider = [2, 1, 0];
let sliderElementsJsonList;
let mouseOver = 0;
document.getElementById("sliderArrows").addEventListener("click", sliderArrowClick);

slider.addEventListener("mouseout", function(){mouseOver=0;});
slider.addEventListener("mouseover", function(){mouseOver=1;});

function apiSlider(){

    fetch(`https://api.bestbuy.com/v1/products(releaseDate<=today)?apiKey=${apiKey}&format=json&show=sku,name,shortDescription,image,regularPrice,salePrice,releaseDate,type&pageSize=10&page=1,customerReviewAverage&sort=releaseDate.dsc`)
    .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      }).then((productsLocal) => {

        //here we call functions that need argument product list
        sliderElementsJsonList = productsLocal.products;
        loadSlider();
        setInterval(nextSliderPageInterval, 3000);
        return 0;

      }).catch(error => alert(error.toString()));
  
    
    }

function loadSlider(){
  let slider0 = document.getElementById("slider0");
  let slider1 = document.getElementById("slider1");
  let slider2 = document.getElementById("slider2");

  slider0.getElementsByTagName("img")[0].src = sliderElementsJsonList[currentSlider[0]].image;
  slider1.getElementsByTagName("img")[0].src = sliderElementsJsonList[currentSlider[1]].image;
  slider2.getElementsByTagName("img")[0].src = sliderElementsJsonList[currentSlider[2]].image;
 
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
    sliderPage = currentSlider[0];
    if(sliderPage<8){
sliderPage++;
    }else{
sliderPage=0;
    }

    currentSlider.pop();
    currentSlider.unshift(sliderPage);

    loadSlider();

}


function previousSliderPage(){
    sliderPage = currentSlider[2];
    if(sliderPage>0){
        sliderPage--;
            }else{
        sliderPage=9;
            }
        
            currentSlider.shift();
            currentSlider.push(sliderPage);
        

            loadSlider();

}

function sliderArrowClick(){
    if(event.target.id.toLowerCase().includes("left")){
        nextSliderPage();
    }else if(event.target.id.toLowerCase().includes("right")){
        previousSliderPage();
    }
}

function nextSliderPageInterval(){

    if(mouseOver===0){
        nextSliderPage();
    }

}

apiSlider();
