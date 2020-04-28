document.getElementById("searchButton").addEventListener("click", function(){ searchPage=1; apiSearch(filters()); });
document.getElementById("pageList").addEventListener("click", pageChange);
document.getElementById("searchBoxRatingRange").addEventListener("change", rangeMouseUp);
document.getElementById("main").addEventListener("click", detailsClick);
let searchAllProducts = [];
let searchByName="";
let apiKey = "IcvHwuaZZxwGBTQF0z3zXAcI";

let searchPage = 1;

function apiSearch(x){

searchByName=document.getElementById("searchText").value;
let fetchUrl = `https://api.bestbuy.com/v1/products(releaseDate<=today&customerReviewAverage>=${x.grade}&${x.searchType}="${searchByName}*"&type="${x.type}"${x.onSale}${x.homeDelivery})?apiKey=${apiKey}&format=json&show=sku,name,customerReviewAverage,customerReviewCount,regularPrice,salePrice,longDescription,shortDescription,image,regularPrice,salePrice,releaseDate,type&pageSize=6&page=${x.page}${x.onSale}${x.homeDelivery},totalPages,customerReviewAverage&sort=releaseDate.dsc`;
/* console.log(fetchUrl);  */   
fetch(fetchUrl)
    .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      }).then((productsLocal) => {

        //here we call functions that need argument product list
        searchAllProducts = productsLocal.products;
        search(productsLocal, x.page);
        return 0;

      }).catch(error => alert(error.toString()));
  

    }

    function search(x, pageParam){
      document.getElementById("main").innerHTML="";
     /*  console.log(x.products); */
      for(let i=0; i<x.products.length; i++){
        document.getElementById("main").innerHTML += `
        <div class="list-product"> 
        <img src="${x.products[i].image}" class="list-product-image" />
        <div class="product-container">
        <h4 class="list-product-name">${x.products[i].name} </h4>
        <div class="list-product-regularPrice">${x.products[i].regularPrice}</div>
        <div class="list-product-salePrice">${x.products[i].salePrice}</div>
        <div class="list-product-rate">${x.products[i].customerReviewAverage} </div>
        <div class="list-product-rate-count">${x.products[i].customerReviewCount} </div>
        <div class="list-product-description">${x.products[i].longDescription} </div>
        <div class="list-product-releaseDate">${x.products[i].releaseDate} </div>
        <div class="sliderDetailsBtn listBtn">Details</div>
        </div>
        </div>
        `;
      }

      if(Number(pageParam)===1){
        document.getElementById("pageList").innerHTML="";
        document.getElementById("pageList").dataset.totalPages = x.totalPages;
      if(x.totalPages>3){
        document.getElementById("pageList").innerHTML = `<div class="pageBtn selPageBtn">1</div><div class="pageBtn">2</div><div class="pageBtn">3</div>...<div class="pageBtn">${x.totalPages}</div>`;
      }else{
        document.getElementById("pageList").innerHTML = `<div class="pageBtn selPageBtn">1</div>`;
        for(let i=1; i<x.totalPages;i++){
          document.getElementById("pageList").innerHTML += `<div class="pageBtn">${i+1}</div>`;
        }
      }
    }

    }


    function pageChange(){
    if(event.target.classList.contains("pageBtn")){
      if(searchPage !== Number(event.target.innerHTML)){

          searchPage=Number(event.target.innerHTML);
          let totalPages = Number(document.getElementById("pageList").dataset.totalPages);

          if(totalPages>3){
          if(searchPage>1&&searchPage<Number(document.getElementById("pageList").getElementsByClassName("pageBtn")[document.getElementById("pageList").getElementsByClassName("pageBtn").length-1].innerHTML)){
            document.getElementById("pageList").innerHTML = `<div class="pageBtn">1</div>...<div class="pageBtn">${searchPage-1}</div><div class="pageBtn selPageBtn">${searchPage}</div><div class="pageBtn">${searchPage+1}</div>...<div class="pageBtn">${totalPages}</div>`;
          }else{
            if(searchPage===totalPages){
              document.getElementById("pageList").innerHTML = `<div class="pageBtn">1</div>...<div class="pageBtn">${searchPage-2}</div><div class="pageBtn">${searchPage-1}</div><div class="pageBtn selPageBtn">${searchPage}</div>`;
            }else if(searchPage===1){
              document.getElementById("pageList").innerHTML = `<div class="pageBtn selPageBtn">1</div><div class="pageBtn">${searchPage+1}</div><div class="pageBtn">${searchPage+2}</div>...<div class="pageBtn">${totalPages}</div>`;
            }

          }
          }else{
            for(let i=0; i<Number(document.getElementById("pageList").getElementsByClassName("pageBtn").length);i++){
              if(document.getElementById("pageList").getElementsByClassName("pageBtn")[i].classList.contains("selPageBtn")){
                document.getElementById("pageList").getElementsByClassName("pageBtn")[i].classList.remove("selPageBtn");
              }
              }
              event.target.classList.add("selPageBtn");
          }


          apiSearch(filters());

      }
    }
    }


    function filters(){
      let onSale="";
      let homeDelivery="";
      let searchType="name";
      let grade="1";
      let type="";

      if(document.getElementById("searchBoxCheckOnSale").checked===true){
      onSale=`&onSale=true`;
      }

      if(document.getElementById("searchBoxCheckHomeDelivery").checked===true){
      homeDelivery=`&homeDelivery=true`;
      }

      if(document.getElementById("searchBoxRadioDescription").checked){
        searchType="longDescription";
      }else if(document.getElementById("searchBoxRadioFormat").checked){
        searchType="format";
      }else{
        searchType="name";
      }

      type=document.getElementById("productTypeSelectSearch").value;
      grade = document.getElementById("currentRating").innerHTML;

      return JSON.parse(`{"page":"${searchPage}", "onSale":"${onSale}", "homeDelivery":"${homeDelivery}", "searchType":"${searchType}", "grade":"${grade}", "type":"${type}"}`);
    }

    function rangeMouseUp(){
      document.getElementById("currentRating").innerHTML=document.getElementById("searchBoxRatingRange").value;
      searchPage=1;
      apiSearch(filters());
    }

    function detailsClick(){
      if(event.target.classList.contains("sliderDetailsBtn")){
      let name=event.target.parentNode.getElementsByClassName("list-product-name")[0].textContent;
      let longDescription=event.target.parentNode.getElementsByClassName("list-product-description")[0].textContent;
      let image=event.target.parentNode.parentNode.getElementsByClassName("list-product-image")[0].src;
      let regularPrice=event.target.parentNode.getElementsByClassName("list-product-regularPrice")[0].textContent;
      let salePrice=event.target.parentNode.getElementsByClassName("list-product-salePrice")[0].textContent;
      let releaseDate=event.target.parentNode.getElementsByClassName("list-product-releaseDate")[0].textContent;
      let customerReviewAverage=event.target.parentNode.getElementsByClassName("list-product-rate")[0].textContent;
      let customerReviewCount=event.target.parentNode.getElementsByClassName("list-product-rate-count")[0].textContent;
      let details = `{"name":"${name}", "longDescription":"${longDescription}", "image":"${image}", "regularPrice":"${regularPrice}", "salePrice":"${salePrice}", "releaseDate":"${releaseDate}", "customerReviewCount":"${customerReviewCount}", "customerReviewAverage":"${customerReviewAverage}"}`;
      window.modalWindowShow(JSON.parse(details));
      }
    }