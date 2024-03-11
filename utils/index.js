function fixName(name, brandName){
    let newName = name.toLowerCase()
    newName = newName.replace(brandName.toLowerCase() + " ", "")
    let firstLetter = newName.charAt(0).toUpperCase()
    newName = firstLetter + newName.slice(1);

    return newName
}

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
        <p>${fixName(product.name, product.brandName)}</p>
        <p class="price">${product.price.current.text}</p>`
    
    productWrapper.appendChild(imgDiv)
    productWrapper.appendChild(infoDiv)
    return productWrapper
}

export function fillpage(products, alt){
    if(products.length != 0){
        document.getElementById("first-page-images-wrapper").style.display = "none"
        let wrapper = document.getElementById("wrapper")
        products.forEach(product => {
            let productDiv = createProduct(product)
            console.log(product)    
            productDiv.addEventListener("click", () =>{
                let url = product.url.split("#")
                let gender = getMenOrWom()
                window.location.href = `http://localhost:8888/alt${alt}/alt${alt}.html?gender=${gender}&page=product&url=${url[0]}&price=${product.price.current.text}`
            })
            wrapper.append(productDiv)
        });
    }
    else {
        let sorry = document.createElement("div");
        sorry.classList.add("sorry")
        sorry.innerHTML = "Sorry, no products match your filter criteria. Please try adjusting your filters or check back later for updates."
        wrapper.append(sorry)
    }



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

export function getCatIdFromUrl(){
    let url = getUrl()
    let catId = url.get("catId")
    return catId
}

export function getTitleFromUrl(){
    let url = getUrl()
    let title = url.get("title")
    return title

}

export function getCategoryTitleFromUrl(){
    let url = getUrl()
    let title = url.get("categoryTitle")
    return title

}

export function getShopByFromUrl(){
    let url = getUrl()
    let shopBy = url.get("shopBy")
    return shopBy

}