let topRatedPage = 1;
document.getElementById("topRatedContent").addEventListener("click", detailsTopRated);
document.getElementById("loadMore").addEventListener("click", nextTopRatedSection1);
function apiTopRated(x){
    fetch(`https://api.bestbuy.com/v1/products(customerReviewCount>=100)?format=json&show=sku,image,name,customerReviewAverage,customerReviewCount,regularPrice,longDescription,salePrice&pageSize=3&page=${x}&sort=customerReviewAverage.desc&apiKey=IcvHwuaZZxwGBTQF0z3zXAcI`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      nextTopRatedSection2(data.products, data.currentPage);
    });
}

function nextTopRatedSection1(){
    if(event.target.classList.contains("sliderDetailsBtn")){
apiTopRated(topRatedPage);
    }
}

function nextTopRatedSection2(x, currentPage){
     document.getElementById("topRatedContent").innerHTML += `
     <div class="sliderForTopRated">
     <div class="topRatedSection"><div class="hiddenJsonForDetails">${JSON.stringify(x[0])}</div><div class="sliderPageForTopRated"><img src="${x[0].image}"><div class="sliderPageInvisibleLayer"><h3 class="sliderPageTitle">${x[0].name}</h3></div></div><div class="topRatedFooter"><div class="topRatedPrice">${x[0].salePrice}$</div><div class="sliderDetailsBtn">Details</div></div></div>
     <div class="topRatedSection"><div class="hiddenJsonForDetails">${JSON.stringify(x[1])}</div><div class="sliderPageForTopRated"><img src="${x[1].image}"><div class="sliderPageInvisibleLayer"><h3 class="sliderPageTitle">${x[1].name}</h3></div></div><div class="topRatedFooter"><div class="topRatedPrice">${x[1].salePrice}$</div><div class="sliderDetailsBtn">Details</div></div></div>
     <div class="topRatedSection"><div class="hiddenJsonForDetails">${JSON.stringify(x[2])}</div><div class="sliderPageForTopRated"><img src="${x[2].image}"><div class="sliderPageInvisibleLayer"><h3 class="sliderPageTitle">${x[2].name}</h3></div></div><div class="topRatedFooter"><div class="topRatedPrice">${x[2].salePrice}$</div><div class="sliderDetailsBtn">Details</div></div></div>
     </div>
    `; 
   topRatedPage=currentPage+1;
}

function detailsTopRated(){
    if(event.target.classList.contains("sliderDetailsBtn")){
        window.modalWindowShow(JSON.parse(event.target.parentNode.parentNode.getElementsByClassName("hiddenJsonForDetails")[0].innerHTML));
    }
}

apiTopRated(1);