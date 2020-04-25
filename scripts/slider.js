let slider = document.getElementById("slider");
let sliderPage = 2;
let apiKey = "IcvHwuaZZxwGBTQF0z3zXAcI";
slider.addEventListener("click", sliderClick);
let currentSlider = [2, 1, 0];
let sliderElementsJsonList;
let sliderMouseOver = 0;
document.getElementById("sliderArrows").addEventListener("click", sliderArrowClick);

slider.addEventListener("mouseout", function(){sliderMouseOver=0;});
slider.addEventListener("mouseover", function(){sliderMouseOver=1;});
slider.addEventListener("click", function(){sliderMouseOver=1; if(event.target.classList.contains("sliderDetailsBtn")){ window.modalWindowShow(sliderElementsJsonList[event.target.dataset.id]); }});

document.addEventListener("mouseover", function(){

    if(event.target.id.toLowerCase().includes("slider") || event.target.id.toLowerCase().includes("modalwindow")){
        sliderMouseOver=1;
    }else{
        if(event.target.classList.item(0)){
            if(event.target.classList.item(0).toLowerCase().includes("slider") || event.target.classList.item(0).toLowerCase().includes("modalwindow")){
                sliderMouseOver=1;
            }else{
                sliderMouseOver=0;
            }
        }else{
            sliderMouseOver=0;
        }
    }

});

function apiSlider(){

    fetch(`https://api.bestbuy.com/v1/products(releaseDate<=today)?apiKey=${apiKey}&format=json&show=sku,name,customerReviewAverage,customerReviewCount,regularPrice,salePrice,longDescription,shortDescription,image,regularPrice,salePrice,releaseDate,type&pageSize=10&page=1,customerReviewAverage&sort=releaseDate.dsc`)
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
  
      for(let i=0; i<3; i++){
      slider.getElementsByClassName("sliderDetailsBtn")[i].addEventListener("mouseover", function(){slider.getElementsByClassName("sliderDetailsBtn")[i].parentNode.parentNode.parentNode.getElementsByClassName("sliderPageLayer")[0].classList.add("sliderPageLayerHide")});
      slider.getElementsByClassName("sliderDetailsBtn")[i].addEventListener("mouseout", function(){slider.getElementsByClassName("sliderDetailsBtn")[i].parentNode.parentNode.parentNode.getElementsByClassName("sliderPageLayer")[0].classList.remove("sliderPageLayerHide")});
      }

    }

function loadSlider(){
  let slider0 = document.getElementById("slider0");
  let slider1 = document.getElementById("slider1");
  let slider2 = document.getElementById("slider2");

  slider0.getElementsByTagName("img")[0].src = sliderElementsJsonList[currentSlider[0]].image;
  slider1.getElementsByTagName("img")[0].src = sliderElementsJsonList[currentSlider[1]].image;
  slider2.getElementsByTagName("img")[0].src = sliderElementsJsonList[currentSlider[2]].image;

  slider0.getElementsByClassName("sliderPageTitle")[0].innerHTML = sliderElementsJsonList[currentSlider[0]].name;
  slider1.getElementsByClassName("sliderPageTitle")[0].innerHTML = sliderElementsJsonList[currentSlider[1]].name;
  slider2.getElementsByClassName("sliderPageTitle")[0].innerHTML = sliderElementsJsonList[currentSlider[2]].name;

  slider0.getElementsByClassName("sliderDetailsBtn")[0].dataset.id = currentSlider[0];
  slider1.getElementsByClassName("sliderDetailsBtn")[0].dataset.id = currentSlider[1];
  slider2.getElementsByClassName("sliderDetailsBtn")[0].dataset.id = currentSlider[2];
 
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
    if(sliderPage<9){
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

    console.log(sliderMouseOver);

    if(sliderMouseOver===0){
        nextSliderPage();
    }

}

apiSlider();
