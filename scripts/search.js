document.getElementById("searchButton").addEventListener("click", apiSearch);
let searchAllProducts = [];
let searchByName="";
let apiKey = "IcvHwuaZZxwGBTQF0z3zXAcI";
function apiSearch(){

searchByName=document.getElementById("searchText").value;

    fetch(`https://api.bestbuy.com/v1/products(releaseDate<=today&name=\"${searchByName}*\")?apiKey=${apiKey}&format=json&show=sku,name,customerReviewAverage,customerReviewCount,regularPrice,salePrice,longDescription,shortDescription,image,regularPrice,salePrice,releaseDate,type&pageSize=9&page=1,totalPages,customerReviewAverage&sort=releaseDate.dsc`)
    .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      }).then((productsLocal) => {

        //here we call functions that need argument product list
        searchAllProducts = productsLocal.products;
        search(productsLocal);
        return 0;

      }).catch(error => alert(error.toString()));
  

    }

    function search(x){
      for(let i=0; i<x.products.length; i++){
        document.getElementById("main").innerHTML += `<br>
        ${i}${x.products[i].name}
        `;
      }

      if(x.totalPages>3){
        document.getElementById("pageList").innerHTML = `<div class="pageBtn">1</div><div class="pageBtn">2</div><div class="pageBtn">3</div>...<div class="pageBtn">${x.totalPages}</div>`;
      }

    }