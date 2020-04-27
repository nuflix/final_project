document.getElementById("searchButton").addEventListener("click", apiSearch);
let searchAllProducts = [];
let $searchByName="act";
let apiKey = "IcvHwuaZZxwGBTQF0z3zXAcI";
function apiSearch(){

    fetch(`https://api.bestbuy.com/v1/products(releaseDate<=today&name=\"${$searchByName}*\")?apiKey=${apiKey}&format=json&show=sku,name,customerReviewAverage,customerReviewCount,regularPrice,salePrice,longDescription,shortDescription,image,regularPrice,salePrice,releaseDate,type&pageSize=9&page=1,customerReviewAverage&sort=releaseDate.dsc`)
    .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      }).then((productsLocal) => {

        //here we call functions that need argument product list
        searchAllProducts = productsLocal.products;
        console.log(searchAllProducts);
        return 0;

      }).catch(error => alert(error.toString()));
  

    }