import { catData, getFiltersType, getProductsByCatId, getProductsByFilters } from "../utils/api.js";
import {fillpage } from "../utils/index.js"


let womenNavData = getNavDataWom()
createNav()
//createBottonListenWoM()

function getNavDataWom(){ 
    let wayToClothingCats = catData.Women.children[4].children[3].children[1].children
    let newIn = wayToClothingCats[2]
    let bestsellers = wayToClothingCats[1]
    let clothing = catData.Women.children[4].children[3]
    let sale = catData.Women.children[4].children[0]

    let navData = [newIn, bestsellers, clothing, sale]
    return navData
    
}

function getNavDataMen(){
    let wayToClothingCats = catData.Men.children[4].children[3].children[1].children

    let newIn = wayToClothingCats[2]
    let bestsellers = wayToClothingCats[1]
    let clothing = catData.Men.children[4].children[3]
    let sale = catData.Men.children[4].children[1]

    let navData = [newIn, bestsellers, clothing, sale]
    return navData
}


// just nu hårdkodas vägen här men det behövs ändras eftersom vägen ser olika ut beroende på män eller kvinna
/*async function createNav(navData){
    
    navData.forEach(titleData =>{
        let titleDiv = document.createElement("div")
        titleDiv.classList.add("nav-title")
        titleDiv.innerHTML = titleData.title
        let products
        if(titleData.title != "Clothing"){
            titleDiv.addEventListener("click", async () =>{
                switch(titleData.title){
                    case "New in": // måste fixas
                    case "Bestsellers":
                        products = await getProductsByCatId(titleData.categoryId)
                    break;
                    case "Sale":
                        products = await getProductsByCatId(28250)
                        // detta är såå hårdkodat, måsta komma på ett bättre sätt 
                    break;
                }
                fillpage(products) 
            } )
        }else{
            createHoverDiv(titleDiv, titleData.children[1].children)
            titleDiv.addEventListener("mouseenter", () => {
                document.getElementById("hover-div").classList.remove("hidden")
            } )

            titleDiv.addEventListener("mouseleave", () => {
                document.getElementById("hover-div").classList.add("hidden")
            } )
        }
 
        document.getElementById("navigation").append(titleDiv)
    })
   
}*/

async function createNav(){
    let navTitles = [
        {
            title: "New In",
            id: 51163}, 
        {
            title: "Bestsellers",
            id: 16661
        }, 
        {
            "title": "Clothing",
            id: null
        },
        {
            "title":"Sale",
            id: 28250
        }]

    navTitles.forEach(title =>{
        let titleDiv = document.createElement("div")
        titleDiv.classList.add("nav-title")
        titleDiv.innerHTML = title.title
        let products
        if(title.title != "Clothing"){
            titleDiv.addEventListener("click", async () =>{
                products = await getProductsByCatId(title.id)
                fillpage(products) 
            } )
        }else{
            let womenCat = catData.Women.children.find(child => child.title == "Categories").children.find(child => child.title == "Clothing").children.find(child => child.title == "SHOP BY PRODUCT").children
            console.log(womenCat)
            createHoverDiv(titleDiv, womenCat)
            titleDiv.addEventListener("mouseenter", () => {
                document.getElementById("hover-div").classList.remove("hidden")
            } )

            titleDiv.addEventListener("mouseleave", () => {
                document.getElementById("hover-div").classList.add("hidden")
            } )
        }
 
        document.getElementById("navigation").append(titleDiv)
    })
   
}

// för att ändra till män och kvinnor.. create nav är dock hårdkodad efter kvinnor så den behöver ändras
function changeToMen(){
    let navWrapper = document.getElementById("navigation")
    if(navWrapper.classList.contains("women")){
        // här borde också läggas till att man kommer till "första sidan" som är anpassad för män
        navWrapper.innerHTML = ""
        navWrapper.classList.remove("women")
        navWrapper.classList.add("men")
        let menNavData = getNavDataMen()
        createNav(menNavData)
    } 
}

function changeToWomen(){
    let navWrapper = document.getElementById("navigation")
    if(navWrapper.classList.contains("men")){
        navWrapper.innerHTML=""
        // här borde också läggas till att man kommer till "första sidan" som är anpassad för kvinnor
        navWrapper.classList.remove("men")
        navWrapper.classList.add("women")
        let wommenNavData = getNavDataWom()
        createNav(wommenNavData)

    } 
}

function createBottonListenWoM(){
    let womenButton = document.getElementById("women")
    let menButton = document.getElementById("men")
    womenButton.addEventListener("click", changeToWomen)
    menButton.addEventListener("click", changeToMen)
}

function createHoverDiv(titleDiv, allCategories){
    let menOrWom;
    if(document.getElementById("navigation").classList.contains("men")){
        menOrWom = "MEN"
    }else{
        menOrWom = "WOMEN"
    }

    let hoverDiv = document.createElement("div")
    hoverDiv.id = "hover-div"
    hoverDiv.classList.add("hidden")
    hoverDiv.innerHTML = `
        <p>${menOrWom}</p>
        <p>SHOP BY PRODUCT</p>`

    let categories = createCategories(allCategories)
    hoverDiv.append(categories)
    titleDiv.append(hoverDiv)
}


function createCategories(allCategories){
    console.log(allCategories)
    let catWrapper = document.createElement("div")
    catWrapper.id = "cat-wrapper"
    
    let div1 = document.createElement("div")
    let div2 = document.createElement("div")
    let i = 0;
    allCategories.forEach(cat =>{
        i++
        let categori = document.createElement("p")
        categori.innerHTML = cat.title
        if(i < 18){
            div1.appendChild(categori)
        }else{
            div2.appendChild(categori)
        }
        categori.addEventListener("click", async () =>{
            document.getElementById("hover-div").classList.add("hidden")
            await createAllFilters(cat)
            console.log(cat)
            let products = await getProductsByCatId(cat.categoryId)
            fillpage(products)
        })
    })
    
    catWrapper.appendChild(div1)
    catWrapper.appendChild(div2)
    return catWrapper
}

async function createAllFilters(style){
    let allFilterWrapper = document.createElement("div")
    allFilterWrapper.id = "all-filters"

    let typeFilter = await createFilterStyle(style)
    allFilterWrapper.appendChild(typeFilter)
    document.getElementById("alt1").append(allFilterWrapper)
}

async function createFilterStyle(style){
    console.log(style)
    let filterTypeWrapper = document.createElement("div")
    filterTypeWrapper.classList.add("filter-wrapper")
    let allTypeFilter = await getFiltersType(style.categoryId)
    console.log(allTypeFilter)

   if(allTypeFilter != null){ /// om den är null måsta vi göra något annat för att visa att det inte finns fler alternativ
       allTypeFilter.forEach(type =>{
            console.log(type)
            let typeDiv = document.createElement("div")
            typeDiv.innerHTML = type.name 
            filterTypeWrapper.appendChild(typeDiv)
            typeDiv.addEventListener("click", async () =>{
                document.getElementById("wrapper").innerHTML = ""
                let productData = await getProductsByFilters(style.categoryId, type.id)
                fillpage(productData)
            })
        })  
    } 
    return filterTypeWrapper
}

async function createFilterColor(style){
    console.log()
    let filterTypeWrapper = document.createElement("div")
    filterTypeWrapper.classList.add("filter-wrapper")
    let allTypeFilter = await getFiltersType(style.categoryId)
    console.log(allTypeFilter)

   if(allTypeFilter != null){ /// om den är null måsta vi göra något annat för att visa att det inte finns fler alternativ
       allTypeFilter.forEach(type =>{
            console.log(type)
            let typeDiv = document.createElement("div")
            typeDiv.innerHTML = type.name 
            filterTypeWrapper.appendChild(typeDiv)
            typeDiv.addEventListener("click", async () =>{
                document.getElementById("wrapper").innerHTML = ""
                let productData = await getProductsByFilters(style.categoryId, type.id)
                fillpage(productData)
            })
        })  
    } 
    return filterTypeWrapper
}