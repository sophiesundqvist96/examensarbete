import { catData, getProductsByCatId, getFilter, getFilteredProducts } from "../utils/api.js";
import { fillpage } from "../utils/index.js"

createNav()

async function createNav() {
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
        let products

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
    });
}

function createHoverDiv(titleDiv, catData, categoryTitle) {
    console.log(categoryTitle)
    console.log(catData)
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
        console.log(categoryTitle.toLowerCase())
        shopBy = "NEW PRODUCTS";
    }

    console.log(shopBy);

    let womenData = catData.Women.children.find(child => child.title == "Categories").children.find(child => child.title == categoryTitle).children.find(child => child.title == shopBy).children
    let menData = catData.Men.children.find(child => child.title == "Categories").children.find(child => child.title == categoryTitle).children.find(child => child.title == shopBy).children


    let categoriesWrapper = createCategories(womenData, menData);
    hoverDiv.appendChild(categoriesWrapper);
    titleDiv.append(hoverDiv);
    return hoverDiv
}

function createCategories(womenData, menData) {
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

    let products;

    womenData.forEach((cat, index) => {
        let category = document.createElement("p");
        category.innerHTML = cat.title;
        category.addEventListener("click", async() => {
            document.getElementById("hover-div").classList.add("hidden")
            fillPageFilterWomen(cat, womenData, "Women")
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

    i = 0;
    menData.forEach((cat, index) => {
        let category = document.createElement("p");
        category.innerHTML = cat.title;
        category.addEventListener("click", async() => {
            document.getElementById("hover-div").classList.add("hidden")
            fillPageFilterMen(cat, menData)


        });
        if (i < 18) {
            menDiv1.appendChild(category);
        } else {
            menDiv2.appendChild(category);
        }
        i++;
    });

    catWrapper.appendChild(womenDiv1);
    catWrapper.appendChild(womenDiv2);
    catWrapper.appendChild(menDiv1);
    catWrapper.appendChild(menDiv2);

    return catWrapper;
}

async function fillPageFilterWomen(cat, womenData) {

    await createAllFilters(cat.categoryId)
    let products = await getProductsByCatId(cat.categoryId, 1)
    fillpage(products)
    createTypeHeader(cat.title, "Women")
    createSideFilters(womenData, cat, "Women")

}

async function fillPageFilterMen(cat, menData) {
    await createAllFilters(cat.categoryId)
    let products = await getProductsByCatId(cat.categoryId, 1)
    fillpage(products)
    createTypeHeader(cat.title, "Men")
    createSideFilters(menData, cat, "Men")
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

    const mainWrapper = document.getElementById("main-wrapper");
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
    let filterTypes = ["color", "brand", "size", "design", "body-fit", "discount", "range", "price-range"];
    let allFilterContainer = document.getElementById("all-filters-container");
    let allFilterWrapper = document.getElementById("all-filters");
    allFilterWrapper.innerHTML = "";
    allFilterContainer.innerHTML = ""


    let filterWrappers = await fetchAllFilters(filterTypes, catId);
    filterWrappers.forEach(filterWrapper => {
        allFilterContainer.appendChild(filterWrapper);
    });
    allFilterContainer.appendChild(allFilterWrapper);
}

async function fetchAllFilters(filterTypes, catId) {
    let filterWrappers = [];

    // Loopa igenom filtertyper och hämta dem med fördröjning
    for (let i = 0; i < filterTypes.length; i++) {
        let filter = filterTypes[i];
        let arrayOfFilters = await fetchFiltersWithDelay(filter, catId, 50);
        let filterWrapper = createFilters(arrayOfFilters, filter, catId);
        filterWrappers.push(filterWrapper);
    }

    return filterWrappers;
}

// Skapa en funktion för att hämta filter asynkront med en fördröjning
async function fetchFiltersWithDelay(filter, catId, delay) {
    await new Promise(resolve => setTimeout(resolve, delay)); // Vänta fördröjning
    return await getFilter(filter, catId); // Hämta filterdata
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
    console.log(selectedFilters)

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
    fillpage(products);
    document.getElementById("main-wrapper").append(document.getElementById("wrapper"))
}


async function filterOnCheckedItems(title, checkedItem, addOrdDelete, catId) {
    console.log(title)
    console.log(checkedItem)
    console.log(catId)
    if (addOrdDelete == "add") {
        filterItems.find(item => item.title == title).checkedItems.push(checkedItem)
    } else {
        filterItems.find(item => item.title == title).checkedItems.pop(checkedItem)
    }

    let filter = filterItems.filter(item => item.checkedItems.length > 0)
    console.log(filter)
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
            console.log(filter[i].checkedItems[j])

            searchString += filter[i].checkedItems[j]
        }
    }

    console.log(catId)
    console.log(searchString)
    let products = await getFilteredProducts(catId, searchString, 1)
    document.getElementById("wrapper").innerHTML = ""
    fillpage(products)
    document.getElementById("main-wrapper").append(document.getElementById("wrapper"))

}

async function createSideFilters(catData, cat, gender) {
    console.log(catData);
    console.log(cat);
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
        let catTitle = document.createElement("div");
        catTitle.classList.add("sideFilterName");
        catTitle.innerHTML = category.title;

        // Lägg till en klickhändelselyssnare för att ladda produkter för den valda kategorin och uppdatera sidofilter
        catTitle.addEventListener("click", async() => {
            console.log(category);
            wrapper.innerHTML = "";
            console.log(underFilters)
            if (typeHeader.length > 0) {
                typeHeader[0].remove()
            }
            underFilters.innerHTML = ""


            if (allFilters.length > 0) {
                allFilters[0].remove()
            }

            // Hämta produkter för den valda kategorin

            if (gender == "Women") {
                fillPageFilterWomen(category, catData); // Skicka med den nya kategorin

            } else if (gender == "Men") {
                fillPageFilterMen(category, catData);

            }
            // Uppdatera sidofilter
            createSideFilters(catData, category);
        });

        let catList = document.createElement("ul"); // Skapa en lista för underkategorierna


        if (cat.categoryId == category.categoryId) {
            catTitle.style.fontWeight = "900";
            catTitle.style.textDecoration = "underline";

            let filterTypes = ["style"];
            let asyncFilterPromises = filterTypes.map(async filter => {
                let arrayOfFilters = await getFilter(filter, cat.categoryId);
                if (arrayOfFilters == null) {
                    let sorry = document.createElement("div");
                    sorry.classList.add("sorry")
                    sorry.innerHTML = "Sorry, no products match your filter criteria. Please try adjusting your filters or check back later for updates."
                    wrapper.append(sorry)
                }
                console.log(arrayOfFilters);
                if (arrayOfFilters) {
                    arrayOfFilters.forEach(type => {
                        let type_li = document.createElement("li");
                        type_li.classList.add("sideFilterType");
                        type_li.innerHTML = type.name;
                        type_li.style.fontWeight = "200";
                        type_li.style.textDecoration = "none";
                        catList.appendChild(type_li);

                        type_li.addEventListener("click", async() => {
                            console.log(cat.title)
                            console.log(category.categoryId)
                            console.log(cat.categoryId)
                            wrapper.innerHTML = "";
                            filterOnCheckedItems("style", type.id, "add", category.categoryId)
                        })
                    });
                }
            })
        }
        catTitle.appendChild(catList);
        sideFiltersContainer.appendChild(catTitle);
    });

    mainWrapper.appendChild(sideFiltersContainer);
    mainWrapper.append(wrapper);
}