import { catData,getProductsByCatId, getFilter, getFilteredProducts } from "../utils/api.js";
import {fillpage, getCatIdFromUrl, getTitleFromUrl, getMenOrWom } from "../utils/index.js"



export async function createNav(){
    let gender = getMenOrWom()
    if(gender == "men"){
        document.getElementById("men").style.fontWeight = "bold"
        document.getElementById("women").style.fontWeight = "200"
    }else{
        document.getElementById("women").style.fontWeight = "bold"
        document.getElementById("men").style.fontWeight = "200"
    }
    console.log(gender)

    let navTitles = [
        {
            title: "New In",
            id:{
                women: 51163,
                men:27110
            }, 
        },
        {
            title: "Bestsellers",
            id: {
                women: 16661,
                men: 16691
            }
        }, 
        {
            title: "Clothing",
            id: null
        },
        {
            title: "Sale",
            id: {
                women: 28250,
                men: 8409
            }
        }]

    navTitles.forEach(title =>{
        let titleDiv = document.createElement("div")
        titleDiv.classList.add("nav-title")
        titleDiv.innerHTML = title.title
        let products
        if(title.title != "Clothing"){
            titleDiv.addEventListener("click", async () =>{
                let id;
                if(gender == "women"){
                    id = title.id.women
                }else{
                   id = title.id.men
                }
                
                products = await getProductsByCatId(id ,1)
                await createAllFilters(id, title.title)
                let wrapper = document.getElementById("wrapper")
                wrapper.innerHTML = ""
                fillpage(products, "1") 
                createShowMore(id, 1, null)
            } )
        }else{
            let data;
            if(gender == "women"){
                data = catData.Women.children.find(child => child.title == "Categories").children.find(child => child.title == "Clothing").children.find(child => child.title == "SHOP BY PRODUCT").children
            }else{
               data = catData.Men.children.find(child => child.title == "Categories").children.find(child => child.title == "Clothing").children.find(child => child.title == "SHOP BY PRODUCT").children
            }
            createHoverDiv(titleDiv, data)
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
    let gender = getMenOrWom()
    if(gender == "women"){
        window.location.href = `http://localhost:8888/alt1/alt1.html?gender=men`
    } 
}

function changeToWomen(){
    let gender = getMenOrWom()
    if(gender == "men"){
        window.location.href = `http://localhost:8888/alt1/alt1.html?gender=women`
    } 
}

export function createBottonListenWoM(){
    let womenButton = document.getElementById("women")
    let menButton = document.getElementById("men")
    womenButton.addEventListener("click", changeToWomen)
    menButton.addEventListener("click", changeToMen)
}

function createHoverDiv(titleDiv, allCategories){
    let menOrWom;
    if(getMenOrWom() == "men"){
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

    let categories = createCategories(allCategories, menOrWom.toLowerCase())
    hoverDiv.append(categories)
    titleDiv.append(hoverDiv)
}


function createCategories(allCategories, gender){
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
           window.location.href = `http://localhost:8888/alt1/alt1.html?page=category&gender=${gender}&catId=${cat.categoryId}&title=${cat.title}`
        })
    })
    
    catWrapper.appendChild(div1)
    catWrapper.appendChild(div2)
    return catWrapper
}

export async function createProductsByCategoryPage(){
    let catId = getCatIdFromUrl()
    let title = getTitleFromUrl()
    await createAllFilters(catId, title)
    let products = await getProductsByCatId(catId, 1)
    let wrapper = document.getElementById("wrapper")
    wrapper.innerHTML = ""
    fillpage(products, "1")
    createShowMore(catId, 1, null)
}

async function createAllFilters(catId, title){
    let filterTypes = ["style", "color", "brand", "size"] // avkommenterat för att ta mindre fetch medan jag stylar
    let allFilterWrapper = document.getElementById("all-filters")
    allFilterWrapper.innerHTML = ""
    createTypeHeader(title)

    // Skapa en array för att lagra alla asynkrona anrop
    let asyncFilterPromises = filterTypes.map(async filter => {
        let arrayOfFilters = await getFilter(filter, catId); // Vänta på att getFilter ska slutföras
        let filterWrapper = null
        console.log(arrayOfFilters)
        if(arrayOfFilters != null){
            filterWrapper = createFilters(arrayOfFilters, filter, catId);
        }
        return filterWrapper;
    });

    // Vänta på att alla asynkrona anrop ska slutföras innan du fortsätter
    let filterWrappers = await Promise.all(asyncFilterPromises);

    // Lägg till alla filterWrappers till allFilterWrapper
    filterWrappers.forEach(filterWrapper => {
        if(filterWrapper != null){
            console.log(filterWrapper)
            allFilterWrapper.appendChild(filterWrapper);
        }
    });
}

function createTypeHeader(productType) {
    let gender = getMenOrWom()
    let typeOfProduct = document.getElementById("cat-title");
    let typeHeader = document.createElement("h3")

    let typeText = "";
    if (gender === "men") {
        typeText += "Men's's ";
    } else{
        typeText += "Women's ";
    }
    typeText += productType;
    typeHeader.innerHTML = typeText;
    typeOfProduct.appendChild(typeHeader);
}

function createFilters(arrayOfFilters, filterTitle, catId){
    let filterWrapper = document.createElement("div")
    filterWrapper.classList.add("filter-wrapper")

    let buttonDiv = document.createElement("div")
    buttonDiv.innerHTML = `
        <div>${filterTitle.charAt(0).toUpperCase() + filterTitle.slice(1)}</div>
        <i class="fa-solid fa-angle-down"></i>`

    buttonDiv.addEventListener("click", () =>{
        let content = buttonDiv.parentNode.querySelector(".dropdown-content");
        if (content.style.display === "block") {
            content.style.display = "none";
            buttonDiv.querySelector("i").classList.add("fa-angle-down")
            buttonDiv.querySelector("i").classList.remove("fa-angle-up")

        } else {
            content.style.display = "block";
            buttonDiv.querySelector("i").classList.remove("fa-angle-down")
            buttonDiv.querySelector("i").classList.add("fa-angle-up")
        }
    })

    let dropdownWrapper = document.createElement("div")
    dropdownWrapper.classList.add("dropdown-content")

    filterWrapper.append(buttonDiv, dropdownWrapper)
    console.log(arrayOfFilters)
   if(arrayOfFilters != null){ /// om den är null måsta vi göra något annat för att visa att det inte finns fler alternativ
        arrayOfFilters.forEach(filter =>{
            let option = document.createElement("div")
            // för namnet på filtert
            let filterDiv = document.createElement("div")
            filterDiv.innerHTML = filter.name
            //checkBox för att tryck i ett alternativ
            let checkBox = document.createElement("input")
            checkBox.setAttribute("type", "checkbox");

            option.append(filterDiv, checkBox)
            dropdownWrapper.append(option)

            // här ska det sorteras när man trycker i rutan istället
            checkBox.addEventListener("click", () =>{
                if(checkBox.checked == true){
                    filterOnCheckedItems(filterTitle, filter.id, "add", catId)
                }else{
                    filterOnCheckedItems(filterTitle, filter.id, "delete", catId)
                }
            })
        })  
    } 
    return filterWrapper
}


let filterItems = [
    {
        title: "style",
        checkedItems: []
    },
    {
        title: "color",
        checkedItems: [] 
    },
    {
        title: "brand",
        checkedItems: [] 
    },
    {
        title: "price-range",
        checkedItems: []
    }
]

async function filterOnCheckedItems(title, checkedItem, addOrdDelete, catId){
    if(addOrdDelete == "add"){
        filterItems.find(item => item.title == title).checkedItems.push(checkedItem)
    }else{
        filterItems.find(item => item.title == title).checkedItems.pop(checkedItem)
    }

    let filter = filterItems.filter(item => item.checkedItems.length > 0)

    let filterAmount = 0
    let searchString = ""
    for(let i = 0; i < filter.length ; i++){
        if(i > 0){
            searchString += "&"
        }
        searchString  += filter[i].title
        searchString  += "="
        for(let j = 0; j < filter[i].checkedItems.length; j++){
            filterAmount++;
            if(j > 0){
                searchString += ","
            }
            searchString += filter[i].checkedItems[j]
        }
    }

    let products = await getFilteredProducts(catId, searchString, 1)
    console.log(products)
    createFilterCount(filterAmount, catId)
    let wrapper = document.getElementById("wrapper")
    wrapper.innerHTML = ""
    if(products.length != 0){
        fillpage(products, "1")
        createShowMore(catId, 1, searchString)
    }else{
        let sorry = document.createElement("div");
        sorry.classList.add("sorry")
        sorry.innerHTML = "Sorry, no products match your filter criteria. Please try adjusting your filters or check back later for updates."
        wrapper.append(sorry)
    }
}

function createFilterCount(count, catId){
    let countWrapper = document.getElementById("count-wrapper")
    countWrapper.innerHTML = ""
    let clearButton = document.createElement("p")
    clearButton.innerHTML = "Clear all"

    let counter = document.createElement("p")
    counter.innerHTML = `Filters (${count})`

    clearButton.addEventListener("click", async () =>{
        let allInputs = Array.from(document.querySelectorAll("input"))
        let checkedInputs = allInputs.filter(input => input.checked == true)
        checkedInputs.forEach(input =>{
            input.checked = false
        }) 
        filterItems.forEach(filter =>{
            filter.checkedItems = []
        })

        let products = await getProductsByCatId(catId, 1)
        let wrapper = document.getElementById("wrapper")
        countWrapper.innerHTML = ""
        wrapper.innerHTML = ""
        fillpage(products, "1")
        createShowMore(catId, 1, null)
    })

    countWrapper.append(clearButton, counter, "")
}


async function createShowMore(catId, counter, searchString){
    let btnBox
    if(!document.getElementById("btnBox")){
        btnBox = document.createElement('div')
        btnBox.id = 'btnBox'
    }else{
        btnBox = document.getElementById("btnBox")
    }

    btnBox.innerHTML = ""

    let btn = document.createElement('div')
    btn.id = "observer-btn"
    btn.innerHTML = `<p>SHOW MORE</p>`
    btn.classList.add('showMore')
    btnBox.appendChild(btn)
  
    let wrapper = document.getElementById('content')
    wrapper.append(btnBox)
    btn.addEventListener("click", async ()=>{
        counter++
        let products
        if(searchString == null){
            products = await getProductsByCatId(catId, counter)
            console.log("ej search")
        }else{
            products = await getFilteredProducts(catId, searchString, counter)
        }

        if(products.length == 0){
            btnBox.innerHTML = "No more products to show"
        }else{
            fillpage(products, "1")

        }
    })

  }

 

