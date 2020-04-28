document.getElementById("searchButton").addEventListener("click", function(){ apiSearch(JSON.parse(`{"page":"1"}`)) });
document.getElementById("pageList").addEventListener("click", pageChange);
let searchAllProducts = [];
let searchByName="";
let apiKey = "IcvHwuaZZxwGBTQF0z3zXAcI";

let searchPage = 1;

function apiSearch(x){

searchByName=document.getElementById("searchText").value;

    fetch(`https://api.bestbuy.com/v1/products(releaseDate<=today&name=\"${searchByName}*\")?apiKey=${apiKey}&format=json&show=sku,name,customerReviewAverage,customerReviewCount,regularPrice,salePrice,longDescription,shortDescription,image,regularPrice,salePrice,releaseDate,type&pageSize=9&page=${x.page},totalPages,customerReviewAverage&sort=releaseDate.dsc`)
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
      for(let i=0; i<x.products.length; i++){
        document.getElementById("main").innerHTML += `<br>
        ${i}${x.products[i].name}
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


          apiSearch(JSON.parse(`{"page":"${searchPage}"}`));

      }
    }
    }