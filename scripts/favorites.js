let arr=[];
let count = 0;

document.getElementById("content").addEventListener("click", removeFav);


function loadFavApi(i){
    
    fetch(`https://api.bestbuy.com/v1/products/${arr[i]}.json?show=sku,image,name,regularPrice,releaseDate,longDescription,customerReviewAverage,customerReviewCount,salePrice&apiKey=IcvHwuaZZxwGBTQF0z3zXAcI`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
        if(i%3===0){
            document.getElementById("topRatedContent").innerHTML+=`
            <div class="sliderForTopRated">
           
            </div>
           `;
            }
        document.getElementsByClassName("sliderForTopRated")[document.getElementsByClassName("sliderForTopRated").length-1].innerHTML+=`
        <div class="topRatedSection"><div class="hiddenJsonForDetails">${JSON.stringify(data)}</div><div class="sliderPageForTopRated"><img src="${data.image}"><div class="sliderPageInvisibleLayer"><h3 class="sliderPageTitle">${data.name}</h3></div></div><div class="topRatedFooter"><div class="topRatedPrice">${data.salePrice}$</div><div class="sliderDetailsBtn details">Details</div><div class="sliderDetailsBtn removeFav" data-id="${arr[i]}">Remove</div></div></div>
        `;
        count++;
        if(count<arr.length){
        loadFavApi(count);
        }
    });

}

function prepareFav(){
    if(localStorage.getItem("favorites")!==null){
        if(JSON.parse(localStorage.getItem("favorites")).length>0){
        arr=JSON.parse(localStorage.getItem("favorites"));
        loadFavApi(0);
        }
    }
}


function removeFav(){
    if(event.target.classList.contains("removeFav")){
        arr = arr.filter(e => e !== event.target.dataset.id);
        localStorage.setItem("favorites", JSON.stringify(arr));
        location.reload();
    }

    if(event.target.classList.contains("details")){
        window.modalWindowShow(JSON.parse(event.target.parentNode.parentNode.getElementsByClassName("hiddenJsonForDetails")[0].innerHTML));
    }
}

prepareFav();