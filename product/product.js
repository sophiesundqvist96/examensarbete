import { createBottonListenWoM, createNav } from "../alt1/alt1.js";
import { getProductByProductUrl } from "../utils/api.js";
 
createProductPage()

function getProductUrl(){
    var url = new URL(window.location.href);
    var params = new URLSearchParams(url.search);
    var parameterValue = params.get('product');
    console.log(parameterValue)
    return parameterValue
}

async function createProductPage(){
    let productUrl = getProductUrl()
    let productData = await getProductByProductUrl(productUrl)
    console.log(productData)
    createProduct(productData)
}

function createProduct(product){
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

    infoWrapper.innerHTML = `<div id="info">
        <p class="brand">${branName}</p>
        <p class="name">${orgName.replace(branName, "")}</p> 
        <p class="price">Price</p> 
        <p class="description"> DESCRIPTION</p>
        <p>${product.description.aboutMe}</p>
        </div>`

    productWrapper.append(imgWrapper, infoWrapper)
}


