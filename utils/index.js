import { getProductsByCatId, getCategories } from "./api.js"
let categoriData = await getCategories()
console.log(categoriData)

function createProduct(product){
    // create wrapper for one product
    let productWrapper = document.createElement("div")
    productWrapper.classList.add('product-wrapper')
    // create div for product img
    let imgDiv = document.createElement("div")
    imgDiv.classList.add("product-img")
    imgDiv.innerHTML= `<img src='https://${product.imageUrl}'></img>`
    // create div for product info
    let infoDiv = document.createElement("div")
    infoDiv.classList.add("product-info")
    infoDiv.innerHTML = `
        <p class="brand-name">${product.brandName.toUpperCase()}</p>
        <p>${product.name}</p>
        <p class="price">${product.price.current.value} kr</p>`
    
    productWrapper.appendChild(imgDiv)
    productWrapper.appendChild(infoDiv)
    return productWrapper
}

export async function fillpage(catId){
    let products = await getProductsByCatId(catId)
    console.log(products)
    let wrapper = document.getElementById("wrapper")

    products.forEach(product => {
        let productDiv = createProduct(product)
        wrapper.append(productDiv)
    });

    document.querySelector("body").append(wrapper)
}

//fillpage()