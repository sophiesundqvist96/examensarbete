

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
        <p class="price">${product.price.current.text}</p>`
    
    productWrapper.appendChild(imgDiv)
    productWrapper.appendChild(infoDiv)
    return productWrapper
}

export function fillpage(products){
    let wrapper = document.getElementById("wrapper")
    wrapper.innerHTML = ""

    products.forEach(product => {
        let productDiv = createProduct(product)
        console.log(product)
        productDiv.addEventListener("click", () =>{
            window.location.href = `http://localhost:8888/product/product.html?product=${product.url}`
        })
        wrapper.append(productDiv)
    });

    document.getElementById("alt1").append(wrapper)
}

//fillpage()