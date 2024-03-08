
export function createProduct(product){
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
        <p>${product.name.replace(product.brandName, "").charAt(0).toUpperCase()}</p>
        <p class="price">${product.price.current.text}</p>`
    
    productWrapper.appendChild(imgDiv)
    productWrapper.appendChild(infoDiv)
    return productWrapper
}

export function fillpage(products){
    document.getElementById("first-page-images-wrapper").style.display = "none"
    let wrapper = document.getElementById("wrapper")
    products.forEach(product => {
        let productDiv = createProduct(product)
        console.log(product)
        productDiv.addEventListener("click", () =>{
            let url = product.url.split("#")
            window.location.href = `http://localhost:8888/product/product.html?product=${url[0]}&price=${product.price.current.text}`
        })
        wrapper.append(productDiv)
    });
}

export function createFrontPageWomen(){
    let imgWrapper = document.getElementById("first-page-images-wrapper")

    for(let i = 1; i<4; i++){
        let imgDiv = document.createElement("div")
        imgDiv.classList.add("first-page-img")
        imgDiv.style.backgroundImage = `url("../images/women${i}.jpg")`
        imgWrapper.appendChild(imgDiv)
    }
}

export function createFrontPageMen(){
    let imgWrapper = document.getElementById("first-page-images-wrapper")

    for(let i = 1; i<4; i++){
        let imgDiv = document.createElement("div")
        imgDiv.classList.add("first-page-img")
        imgDiv.style.backgroundImage = `url("../images/man${i}.jpg")`
        imgWrapper.appendChild(imgDiv)
    }
}

export function createFrontPage(){
    let gender = getMenOrWom()

    if(gender == "men"){
        createFrontPageMen()
        document.getElementById("men").style.fontWeight = "bold"
        document.getElementById("women").style.fontWeight = "200"
    }else{
        createFrontPageWomen()
        document.getElementById("women").style.fontWeight = "bold"
        document.getElementById("men").style.fontWeight = "200"
    }
}

export function getUrl(){
    var url = new URL(window.location.href);
    console.log(url)
    var params = new URLSearchParams(url.search);
    return params;
}

export function getMenOrWom(){
    let url = getUrl()
    let gender = url.get('gender');
    if(gender == "men"){
        return "men"
    }else{
        return "women"
    }
}