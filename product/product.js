import { getProductByProductUrl, getSimilarProducts} from "../utils/api.js";
import { createProduct, getUrl } from "../utils/index.js";
import { createNav } from "../alt1/alt1.js";
 
createProductPage()
createNav()
createButtonListenNav()


function getProductUrl(){
    let url = getUrl()
    let productUrl = url.get('product');
    return productUrl
}

function getPice(){
    let url = getUrl()
    let price = url.get('price');
    return price
}


async function createProductPage(){
    let productUrl = getProductUrl()
    let productData = await getProductByProductUrl(productUrl)
    console.log(productData)
    createOneProduct(productData)
}

function createOneProduct(product){
    let productWrapper = document.getElementById("product-wrapper")

    let imgWrapper = document.createElement("div") // gör detta till grid där en är mycket större än de andra
    imgWrapper.id = "product-all-images"
    let infoWrapper = document.createElement("div")
    infoWrapper.id = "info-wrapper"

    let mainImgWrapper = document.createElement("div")
    let samllImgWrapper = document.createElement("div")
    samllImgWrapper.id = "product-small-img-wrapper"
    for(let i = 0; i < product.images.length; i++){
        let img = product.images[i]
        let imgDiv = document.createElement("div")
        imgDiv.innerHTML = `<img src='${img.url}'></img>`
        let mainImg;
        if(i == 0){
            imgDiv.classList.add("main-img")
            mainImgWrapper.appendChild(imgDiv)
        }else{
            imgDiv.classList.add("product-images")
            samllImgWrapper.append(imgDiv)
            imgDiv.addEventListener("mouseover", function() {
                let imgSrc = imgDiv.querySelector("img").src
                console.log(imgSrc)
                let mainDiv = document.querySelector(".main-img")
                mainImg = mainDiv.querySelector("img").src
                mainDiv.querySelector("img").src = imgSrc
            });

            imgDiv.addEventListener("mouseout", function(){
                let mainDiv = document.querySelector(".main-img")
                mainDiv.querySelector("img").src = mainImg
            })
        }



    }
    imgWrapper.append(samllImgWrapper, mainImgWrapper)

    let orgName = product.name
    let branName = product.brandName
    let price = getPice()

    infoWrapper.innerHTML = `<div id="info">
        <p class="brand">${branName}</p>
        <p class="name">${orgName.replace(branName, "")}</p> 
        <p class="price">Price ${price}</p> 
        <p class="description"> DESCRIPTION</p>
        <p>${product.description.aboutMe}</p>
        </div>`

    productWrapper.append(imgWrapper, infoWrapper)
    createSimilar(product.id)
    
}

async function createSimilar(catId){
    let wrapper = document.getElementById("similar-wrapper")
    wrapper.innerHTML = "<h4>Similar products</h3>"
    let similarProductWrapper = document.createElement("div")
    similarProductWrapper.id = "similar-products-wrapper"

    let arrayOfSimilar = await getSimilarProducts(catId)
    arrayOfSimilar.forEach(product => {
        let productDiv = createProduct(product)
        similarProductWrapper.appendChild(productDiv)
        productDiv.addEventListener("click", () =>{
            let url = product.url.split("#")
            window.location.href = `http://localhost:8888/product/product.html?product=${url[0]}&price=${product.price.current.text}`
        })
    });

    wrapper.append(similarProductWrapper)
    
  }


  function createButtonListenNav(){
    let men = document.getElementById("men")
    let women = document.getElementById("women")
    let title = document.getElementById("title")

    men.addEventListener("click", () =>{
        window.location.href = `http://localhost:8888/alt1/alt1.html?gender=men`
    })
    women.addEventListener("click", ()=>{
        window.location.href = `http://localhost:8888/alt1/alt1.html?gender=women`
    })

    title.addEventListener("click", ()=>{
        window.location.href = `http://localhost:8888/alt1/alt1.html?gender=women`
    })
  }