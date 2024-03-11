import { catData, getProductsByCatId, getFilter, getFilteredProducts } from "../utils/api.js";
import { fillpage, getCatIdFromUrl, getTitleFromUrl } from "../utils/index.js"


export async function createNav() {
    let navTitles = [{
            title: "New in",
            id: 51163
        },
        // {
        //     title: "Bestsellers",
        //     id: 16661
        // },
        {
            "title": "Clothing",
            id: null
        },
        {
            "title": "Shoes",
            id: 4172
        },
        {
            "title": "Accessories",
            id: 4174
        },
        {
            //ändra idet här sen just nu bara ASOS brand
            "title": "Brands",
            id: 4877
        },
        {
            "title": "Sale",
            id: 28250
        }
    ]

    let currentHoverDiv = null;

    navTitles.forEach(title => {
        let titleDiv = document.createElement("div")
        titleDiv.classList.add("nav-title")
        titleDiv.innerHTML = title.title

        titleDiv.addEventListener("mouseenter", () => {
            // Ta bort eventuellt befintligt hover-div
            if (currentHoverDiv) {
                currentHoverDiv.remove();
                currentHoverDiv = null;
            }
            currentHoverDiv = createHoverDiv(titleDiv, catData, title.title);
            titleDiv.append(currentHoverDiv);
            // document.getElementById("navigation").append(currentHoverDiv);
            currentHoverDiv.classList.remove("hidden")
                // Skapa det nya hover-div
        });

        titleDiv.addEventListener("mouseleave", () => {
            // Ta bort hover-div när musen lämnar
            if (currentHoverDiv) {
                currentHoverDiv.remove();
                currentHoverDiv = null;
            }

        });

        document.getElementById("navigation").append(titleDiv)
        document.getElementById("title").addEventListener("click", ()=>{
            window.location.href = `http://localhost:8888/alt2/alt2.html`
        })
    });
}

function createHoverDiv(titleDiv, catData, categoryTitle) {
    let hoverDiv = document.createElement("div");
    hoverDiv.id = "hover-div";
    hoverDiv.classList.add("hidden")

    let shopBy;
    if (categoryTitle.toLowerCase() === "sale" || categoryTitle.toLowerCase() === "clothing" || categoryTitle.toLowerCase() === "accessories") {
        shopBy = "SHOP BY PRODUCT";
    } else if (categoryTitle.toLowerCase() === "brands") {
        shopBy = "Top Brands";
    } else if (categoryTitle.toLowerCase() === "shoes") {
        shopBy = "SHOP BY STYLE";
    } else if (categoryTitle.toLowerCase() === "new in") {
        shopBy = "NEW PRODUCTS";
    }

    let womenData = catData.Women.children.find(child => child.title == "Categories").children.find(child => child.title == categoryTitle).children.find(child => child.title == shopBy).children
    let menData = catData.Men.children.find(child => child.title == "Categories").children.find(child => child.title == categoryTitle).children.find(child => child.title == shopBy).children


    let categoriesWrapper = createCategories(womenData, menData, categoryTitle, shopBy);
    hoverDiv.appendChild(categoriesWrapper);
    titleDiv.append(hoverDiv);
    return hoverDiv
}

function createCategories(womenData, menData, categoryTitle, shopBy) {
    let catWrapper = document.createElement("div");
    catWrapper.id = "cat-wrapper";

    let womenDiv1 = document.createElement("div");
    womenDiv1.classList.add("category-column");
    let womenDiv2 = document.createElement("div");
    womenDiv2.classList.add("category-column");
    womenDiv2.classList.add("category-column2");

    let menDiv1 = document.createElement("div");
    menDiv1.classList.add("category-column");
    let menDiv2 = document.createElement("div");
    menDiv2.classList.add("category-column");
    menDiv2.classList.add("category-column2");

    let i = 0;
    // WOMEN Categories
    let womenLabel = document.createElement("p");
    womenLabel.classList.add("catTitle")
    womenLabel.innerHTML = "WOMEN";
    womenDiv1.appendChild(womenLabel);
    womenDiv1.appendChild(document.createElement("br"));

    womenData.forEach((cat, index) => {
        let category = document.createElement("p");
        category.innerHTML = cat.title;
        category.addEventListener("click", async() => {
            document.getElementById("hover-div").classList.add("hidden")
            window.location.href = `http://localhost:8888/alt2/alt2.html?page=category&catId=${cat.categoryId}&title=${cat.title}&gender=women&categoryTitle=${categoryTitle}&shopBy=${shopBy}`
        });
        if (i < 18) {
            womenDiv1.appendChild(category);
        } else {
            womenDiv2.appendChild(category);

        }
        i++;
    });

    // MEN Categories
    let menLabel = document.createElement("p");
    menLabel.innerHTML = "MEN"
    menLabel.classList.add("catTitle")
    menDiv1.appendChild(menLabel);
    menDiv1.appendChild(document.createElement("br"));
    catWrapper.appendChild(womenDiv1);
    if(i >= 18){
        catWrapper.appendChild(womenDiv2);
    }

    i = 0;
    menData.forEach((cat, index) => {
        let category = document.createElement("p");
        category.innerHTML = cat.title;
        category.addEventListener("click", async() => {
            document.getElementById("hover-div").classList.add("hidden")
            window.location.href = `http://localhost:8888/alt2/alt2.html?page=category&catId=${cat.categoryId}&title=${cat.title}&gender=men&categoryTitle=${categoryTitle}&shopBy=${shopBy}`
        });
        if (i < 18) {
            menDiv1.appendChild(category);
        } else {
            menDiv2.appendChild(category);
        }
        i++;
    });

    catWrapper.appendChild(menDiv1);
    if(i >= 18){
        catWrapper.appendChild(menDiv2);
    }

    return catWrapper;
}

export async function fillPageFilterWomen(catId, womenData, title) {

    await createAllFilters(catId)
    let products = await getProductsByCatId(catId, 1)
    fillpage(products, "2")
    createShowMore(catId, 1, null)
    createTypeHeader(title, "Women")
    createSideFilters(womenData, catId, "Women")

}

export async function fillPageFilterMen(catId, menData, title) {
    await createAllFilters(catId)
    let products = await getProductsByCatId(catId, 1)
    fillpage(products, "2")
    createShowMore(catId, 1, null)
    createTypeHeader(title, "Men")
    createSideFilters(menData, catId, "Men")
}

function createTypeHeader(productType, gender) {
    let typeOfProduct = document.getElementById("type");
    let typeHeader = document.createElement("h3");
    typeHeader.classList.add("typeHeader")

    let typeText = "";
    if (gender === "Women") {
        typeText += "Women's ";
    } else if (gender === "Men") {
        typeText += "Men's ";
    }
    typeText += productType;
    typeHeader.innerHTML = typeText;
    typeOfProduct.appendChild(typeHeader);
}

async function createAllFilters(catId) {
    const wrapper = document.getElementById("wrapper");
    const underFilters = document.getElementById("under-filters");
    const typeHeader = document.getElementsByClassName("typeHeader");
    const allFilters = document.getElementsByClassName("filter-wrapper");

    wrapper.innerHTML = "";

    if (typeHeader.length > 0) {
        typeHeader[0].remove()
    }
    underFilters.innerHTML = ""


    if (allFilters.length > 0) {
        allFilters[0].remove()
    }

    //Style ska inte finnas här bara i sidefilter sen!
    let filterTypes = ["color"]
        // "brand", "size", "design", "body-fit", "discount", "range", "price-range"];
    createAllFiltersTest(filterTypes, catId)
}


async function createAllFiltersTest(filterTypes, catId) {
    let allFilterContainer = document.getElementById("all-filters-container")
    allFilterContainer.innerHTML = ""
    let third = Math.floor(filterTypes.length / 3);
    let arr1 = filterTypes.slice(0, third);
    console.log(arr1)
    let arr2 = filterTypes.slice(third, third * 2); // Korrigerad linje
    console.log(arr2)
    let arr3 = filterTypes.slice(third * 2); // Korrigerad linje
    console.log(arr3)

    let filterswrapper1 = await callFilters(arr1, catId)
    let filterswrapper2 = await new Promise((resolve, reject) => {
        setTimeout(async() => {
            resolve(await callFilters(arr2, catId));
        }, 1000); // Fördröj anropet med 1000 ms
    });

    let filterswrapper3 = await new Promise((resolve, reject) => {
        setTimeout(async() => {
            resolve(await callFilters(arr3, catId));
        }, 1000); // Fördröj anropet med 1000 ms
    });

    let filters = filterswrapper1.concat(filterswrapper2)
    console.log(filters)
    filters = filters.concat(filterswrapper3)
    console.log(filters)

    filters.forEach(filterWrapper => {
        if (filterWrapper != null) {
            allFilterContainer.appendChild(filterWrapper);
        }
    });

}

async function callFilters(array, catId) {
    let asyncFilterPromises = array.map(async filter => {
        let arrayOfFilters = await getFilter(filter, catId); // Vänta på att getFilter ska slutföras
        let filterWrapper = null
        console.log(arrayOfFilters)
        if (arrayOfFilters != null) {
            filterWrapper = createFilters(arrayOfFilters, filter, catId);
        }
        return filterWrapper;
    });

    let filterWrappers = await Promise.all(asyncFilterPromises);
    return filterWrappers

}



let filterItems = [{
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
    },
    {
        title: "design",
        checkedItems: []
    },
    {
        title: "body-fit",
        checkedItems: []
    },
    {
        title: "discount",
        checkedItems: []
    },
    {
        title: "range",
        checkedItems: []
    },
    {
        title: "price-range",
        checkedItems: []
    }
]

function createFilters(arrayOfFilters, filterTitle, catId) {

    let filterWrapper = document.createElement("div")
    filterWrapper.classList.add("filter-wrapper")

    let buttonDiv = document.createElement("div")
    buttonDiv.innerHTML = `
        <div>${filterTitle.charAt(0).toUpperCase() + filterTitle.slice(1)}</div>
        <i class="fa-solid fa-angle-down"></i>`

    buttonDiv.addEventListener("click", () => {
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

    if (arrayOfFilters != null) {
        arrayOfFilters.forEach(filter => {
            let option = document.createElement("div")

            let filterDiv = document.createElement("div")
            filterDiv.innerHTML = filter.name

            let checkBox = document.createElement("input")
            checkBox.setAttribute("type", "checkbox");

            option.append(filterDiv, checkBox)
            dropdownWrapper.append(option)

            const underFiltersContainer = document.getElementById('under-filters');
            let selectedFilters = [];


            checkBox.addEventListener("click", () => {

                if (checkBox.checked) {
                    filterOnCheckedItems(filterTitle, filter.id, "add", catId);
                    selectedFilters.push(filter.name);
                    handleCheckboxChecked(selectedFilters, underFiltersContainer, filter, filterTitle, catId, checkBox)

                } else {
                    filterOnCheckedItems(filterTitle, filter.id, "delete", catId);
                    handleCheckboxUnchecked(selectedFilters, underFiltersContainer, filter)
                }
            });
        })


    }
    return filterWrapper
}

function handleCheckboxChecked(selectedFilters, underFiltersContainer, filter, filterTitle, catId, checkBox) {

    let clearButton = underFiltersContainer.querySelector(".clear-button");

    if (!clearButton) {
        clearButton = document.createElement("p");
        clearButton.classList.add("clear-button");
        clearButton.innerHTML = "Clear all";
        underFiltersContainer.appendChild(clearButton);
    }

    clearButton.addEventListener("click", async() => {
        clearFilters(selectedFilters, underFiltersContainer, catId)

    });


    selectedFilters.forEach(filterName => {
        const filterNameDiv = document.createElement("div");
        filterNameDiv.classList.add("filterNameDiv");
        filterNameDiv.innerHTML = `
    ${filterName} <i class="fa-solid fa-xmark"></i>`;
        filterNameDiv.querySelector('.fa-xmark').addEventListener('click', () => {

            filterNameDiv.parentNode.removeChild(filterNameDiv);
            const index = selectedFilters.indexOf(filter.name);
            if (index !== -1) {
                selectedFilters.splice(index, 1);
            }


            filterOnCheckedItems(filterTitle, filter.id, "delete", catId);
            checkBox.checked = false;
        });
        underFiltersContainer.appendChild(filterNameDiv);


    });

}

function handleCheckboxUnchecked(selectedFilters, underFiltersContainer, filter) {
    const filterNameDivs = underFiltersContainer.querySelectorAll(`.filterNameDiv`); // Ändra selektorn för att välja divs istället för paragrafer
    filterNameDivs.forEach(div => {
        if (div.textContent.trim() === filter.name) {
            underFiltersContainer.removeChild(div);
            // Ta bort filternamnet från arrayen av valda filter
            const index = selectedFilters.indexOf(filter.name);
            if (index !== -1) {
                selectedFilters.splice(index, 1);
            }
        }
    });

}

async function clearFilters(selectedFilters, underFiltersContainer, catId) {

    selectedFilters.splice(0, selectedFilters.length); // Detta kommer att tömma hela arrayen

    let allInputs = Array.from(document.querySelectorAll("input"));
    let checkedInputs = allInputs.filter(input => input.checked == true);
    checkedInputs.forEach(input => {
        input.checked = false;
    });

    filterItems.forEach(filter => {
        filter.checkedItems = [];
    });

    underFiltersContainer.innerHTML = "";

    let products = await getProductsByCatId(catId, 1);
    document.getElementById("wrapper").innerHTML = "";
    fillpage(products, "2");
    createShowMore(catId, 1, null)
    document.getElementById("main-wrapper").append(document.getElementById("wrapper"))
}


async function filterOnCheckedItems(title, checkedItem, addOrdDelete, catId) {
    if (addOrdDelete == "add") {
        filterItems.find(item => item.title == title).checkedItems.push(checkedItem)
    } else {
        filterItems.find(item => item.title == title).checkedItems.pop(checkedItem)
    }

    let filter = filterItems.filter(item => item.checkedItems.length > 0)
    let searchString = ""
    for (let i = 0; i < filter.length; i++) {
        if (i > 0) {
            searchString += "&"
        }
        searchString += filter[i].title
        searchString += "="
        for (let j = 0; j < filter[i].checkedItems.length; j++) {
            if (j > 0) {
                searchString += ","
            }
            searchString += filter[i].checkedItems[j]
        }
    }

    let products = await getFilteredProducts(catId, searchString, 1)
    document.getElementById("wrapper").innerHTML = ""
    fillpage(products, "2")
    createShowMore(catId, 1, searchString)
    document.getElementById("main-wrapper").append(document.getElementById("wrapper"))

}

async function createSideFilters(catData, catId, gender) {
    const mainWrapper = document.getElementById("main-wrapper");
    const wrapper = document.getElementById("wrapper");
    const underFilters = document.getElementById("under-filters");
    const typeHeader = document.getElementsByClassName("typeHeader");
    const allFilters = document.getElementsByClassName("filter-wrapper");
    mainWrapper.innerHTML = "";

    // Create a common div container for side filters
    const sideFiltersContainer = document.createElement("div");
    sideFiltersContainer.classList.add("side-filters-container");

    catData.forEach(async category => {
        // let catTitle = document.createElement("div");
        // catTitle.classList.add("sideFilterName");
        let mainTitle = document.createElement("div")
        mainTitle.innerHTML = category.title;
        mainTitle.classList.add("mainTitle")
        sideFiltersContainer.appendChild(mainTitle)

        // Lägg till en klickhändelselyssnare för att ladda produkter för den valda kategorin och uppdatera sidofilter
        mainTitle.addEventListener("click", () => {

            wrapper.innerHTML = "";
            if (typeHeader.length > 0) {
                typeHeader[0].remove()
            }
            underFilters.innerHTML = ""


            if (allFilters.length > 0) {
                allFilters[0].remove()
            }

            // Hämta produkter för den valda kategorin

            if (gender == "Women") {
                let currUrl = new URL(window.location.href);
                let stringUrl = currUrl.href


                let newCatId = category.categoryId
                let newTitle = category.title
                let newUrl = stringUrl.replace(getCatIdFromUrl(), newCatId)
                newUrl = newUrl.replace(getTitleFromUrl(), newTitle)
                window.location.href = newUrl
               

            } else if (gender == "Men") {
                let currUrl = new URL(window.location.href);
                let stringUrl = currUrl.href

                let newCatId = category.categoryId
                let newTitle = category.title
                let newUrl = stringUrl.replace(getCatIdFromUrl(), newCatId)
                newUrl = newUrl.replace(getTitleFromUrl(), newTitle)
                window.location.href = newUrl
                 

            }
            // Uppdatera sidofilter
            //createSideFilters(catData, category);
        });

        let catList = document.createElement("div"); // Skapa en lista för underkategorierna


        if (catId == category.categoryId) {
            mainTitle.style.fontWeight = "500";
            mainTitle.style.textDecoration = "underline";

            let arrayOfStyleFilters = await getFilter("style", catId)
            if (arrayOfStyleFilters != null) {
                arrayOfStyleFilters.forEach(type => {
                    let type_li = document.createElement("p");
                    type_li.classList.add("sideFilterType");
                    type_li.innerHTML = type.name;
                    type_li.style.fontWeight = "200";
                    type_li.style.textDecoration = "none";
                    catList.appendChild(type_li);

                    type_li.addEventListener("click", async(event) => {
                        event.stopPropagation()
                        type_li.style.fontWeight = "500";
                        type_li.style.textDecoration = "underline";
                        wrapper.innerHTML = "";
                        filterOnCheckedItems("style", type.id, "add", category.categoryId)
                    })
                });
            } 
        }
        mainTitle.appendChild(catList);
        // sideFiltersContainer.appendChild(catTitle);
    });

    mainWrapper.appendChild(sideFiltersContainer);
    mainWrapper.append(wrapper);
}

export function createFrontPage() {
    let imgWrapper = document.getElementById("first-page-images-wrapper")

    for (let i = 1; i < 4; i++) {
        let imgDiv = document.createElement("div")
        imgDiv.classList.add("first-page-img")
        imgDiv.style.backgroundImage = `url("../images/mix${i}.jpg")`
        imgWrapper.appendChild(imgDiv)
    }
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