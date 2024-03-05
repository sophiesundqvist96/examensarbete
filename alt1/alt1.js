import { catData,getProductsByCatId, getFilter, getFilteredProducts } from "../utils/api.js";
import {fillpage } from "../utils/index.js"


createNav()
createBottonListenWoM()

export async function createNav(){
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
                if(document.getElementById("navigation").classList.contains("women")){
                    id = title.id.women
                }else{
                   id = title.id.men
                }
                
                products = await getProductsByCatId(id)
                console.log(products)
                await createAllFilters(id)
                fillpage(products) 
            } )
        }else{
            let data;
            if(document.getElementById("navigation").classList.contains("women")){
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
    let navWrapper = document.getElementById("navigation")
    if(navWrapper.classList.contains("women")){
        document.getElementById("wrapper").innerHTML = ""
        // här borde också läggas till att man kommer till "första sidan" som är anpassad för män
        navWrapper.classList.remove("women")
        navWrapper.classList.add("men")
        navWrapper.innerHTML = ""
        createNav()
    } 
}

function changeToWomen(){
    let navWrapper = document.getElementById("navigation")
    if(navWrapper.classList.contains("men")){
        document.getElementById("wrapper").innerHTML = ""
        // här borde också läggas till att man kommer till "första sidan" som är anpassad för kvinnor
        navWrapper.classList.remove("men")
        navWrapper.classList.add("women")
        navWrapper.innerHTML = ""
        createNav()
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
            await createAllFilters(cat.categoryId, cat.title)
            let products = await getProductsByCatId(cat.categoryId)
            fillpage(products)
        })
    })
    
    catWrapper.appendChild(div1)
    catWrapper.appendChild(div2)
    return catWrapper
}

async function createAllFilters(catId, title){
    let filterTypes = ["style", "color", "brand", "size"] // avkommenterat för att ta mindre fetch medan jag stylar
    let allFilterWrapper = document.getElementById("all-filters")
    allFilterWrapper.innerHTML = ""
    createPageTitle(title)

    // Skapa en array för att lagra alla asynkrona anrop
    let asyncFilterPromises = filterTypes.map(async filter => {
        let arrayOfFilters = await getFilter(filter, catId); // Vänta på att getFilter ska slutföras
        let filterWrapper = createFilters(arrayOfFilters, filter, catId);
        return filterWrapper;
    });

    // Vänta på att alla asynkrona anrop ska slutföras innan du fortsätter
    let filterWrappers = await Promise.all(asyncFilterPromises);

    // Lägg till alla filterWrappers till allFilterWrapper
    filterWrappers.forEach(filterWrapper => {
        allFilterWrapper.appendChild(filterWrapper);
    });
}

function createPageTitle(title){
    let gender;
    if(document.getElementById("navigation").classList.contains("men")){
        gender = "Men"
    }else{
        gender = "Women"
    }
    let titleDiv = document.getElementById("cat-title")
    titleDiv.innerHTML = `<h1>${title} For ${gender}</h1>`
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

    let products = await getFilteredProducts(catId, searchString)
    createFilterCount(filterAmount, catId)
    fillpage(products)
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

        let products = await getProductsByCatId(catId)
        fillpage(products)
        createFilterCount(0 , catId)

    })

    countWrapper.append(clearButton, counter)
}