import { catData, getProductsByCatId, getFilter, getFilteredProducts } from "../utils/api.js";
import { fillpage } from "../utils/index.js"

createNav()

async function createNav() {
    let navTitles = [{
            title: "New In",
            id: 51163
        },
        {
            title: "Bestsellers",
            id: 16661
        },
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

    navTitles.forEach(title => {
        let titleDiv = document.createElement("div")
        titleDiv.classList.add("nav-title")
        titleDiv.innerHTML = title.title
        let products
        if (title.title != "Clothing") {
            titleDiv.addEventListener("click", async() => {
                products = await getProductsByCatId(title.id)
                fillpage(products)
            })
        } else {
            let womenCat = catData.Women.children.find(child => child.title == "Categories").children.find(child => child.title == "Clothing").children.find(child => child.title == "SHOP BY PRODUCT").children
            console.log(womenCat)
            createHoverDiv(titleDiv, catData)
            titleDiv.addEventListener("mouseenter", () => {
                document.getElementById("hover-div").classList.remove("hidden")
            })

            titleDiv.addEventListener("mouseleave", () => {
                document.getElementById("hover-div").classList.add("hidden")
            })
        }

        document.getElementById("navigation").append(titleDiv)
    })

}

function createHoverDiv(titleDiv, catData) {
    let hoverDiv = document.createElement("div");
    hoverDiv.id = "hover-div";
    let womenData = catData.Women.children.find(child => child.title == "Categories").children.find(child => child.title == "Clothing").children.find(child => child.title == "SHOP BY PRODUCT").children
    let menData = catData.Men.children.find(child => child.title == "Categories").children.find(child => child.title == "Clothing").children.find(child => child.title == "SHOP BY PRODUCT").children

    let categoriesWrapper = createCategories(womenData, menData);
    hoverDiv.appendChild(categoriesWrapper);

    titleDiv.append(hoverDiv);
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
    let products = await getProductsByCatId(cat.categoryId)
    fillpage(products)
    createTypeHeader(cat.title, "Women")
    createSideFilters(womenData, cat, "Women")
}

async function fillPageFilterMen(cat, menData) {
    await createAllFilters(cat.categoryId)
    let products = await getProductsByCatId(cat.categoryId)
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

    //Style ska inte finnas här bara i sidefilter sen!
    let filterTypes = ["style"]

    // , "color", "brand", "size", "design"]

    // , "body-fit", "discount", "range", "price-range"] // avkommenterat för att ta mindre fetch medan jag stylar

    let allFilterContainer = document.getElementById("all-filters-container")
    let allFilterWrapper = document.getElementById("all-filters")
    allFilterWrapper.innerHTML = ""

    let asyncFilterPromises = filterTypes.map(async filter => {
        let arrayOfFilters = await getFilter(filter, catId); // Vänta på att getFilter ska slutföras
        let filterWrapper = createFilters(arrayOfFilters, filter, catId);
        console.log(arrayOfFilters)
        console.log(filter)
        console.log(catId)
        return filterWrapper;
    });

    let filterWrappers = await Promise.all(asyncFilterPromises);

    filterWrappers.forEach(filterWrapper => {
        allFilterContainer.appendChild(filterWrapper);
    });

    allFilterContainer.appendChild(allFilterWrapper)
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

    let products = await getProductsByCatId(catId);
    document.getElementById("wrapper").innerHTML = "";
    fillpage(products);
}


async function filterOnCheckedItems(title, checkedItem, addOrdDelete, catId) {
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
    let products = await getFilteredProducts(catId, searchString)
    document.getElementById("wrapper").innerHTML = ""
    fillpage(products)
}

async function createSideFilters(catData, cat, gender) {
    console.log(catData);
    console.log(cat);
    const mainWrapper = document.getElementById("main-wrapper");
    const wrapper = document.getElementById("wrapper");
    const underFiltes = document.getElementById("under-filters");
    const typeHeader = document.getElementsByClassName("typeHeader");
    mainWrapper.innerHTML = "";


    catData.forEach(async category => {
        let catTitle = document.createElement("div");
        catTitle.classList.add("sideFilterName");
        catTitle.innerHTML = category.title;

        // Lägg till en klickhändelselyssnare för att ladda produkter för den valda kategorin och uppdatera sidofilter
        catTitle.addEventListener("click", async() => {
            console.log(category);
            wrapper.innerHTML = "";
            underFiltes.innerHTML = "";
            typeHeader.innerHTML = "";
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
            let filterTypes = ["style"];
            let asyncFilterPromises = filterTypes.map(async filter => {
                let arrayOfFilters = await getFilter(filter, cat.categoryId);
                console.log(arrayOfFilters);
                if (arrayOfFilters) {
                    arrayOfFilters.forEach(type => {
                        let type_li = document.createElement("li"); // Skapa ett listelement för varje underkategori
                        type_li.classList.add("sideFilterType");
                        type_li.innerHTML = type.name;

                        catList.appendChild(type_li);

                        type_li.addEventListener("click", async() => {
                            handleSideFilter(type)
                        })
                    });
                }
            })
        }
        catTitle.appendChild(catList); // Lägg till listan av underkategorier under kategoridiv
        mainWrapper.appendChild(catTitle);

    });
}

async function handleSideFilter(type) {
    console.log(type.id);

    // Skapa söksträngen för filtret "style"
    let searchString = "style=" + type.id;

    // Hämta filtrerade produkter baserat på kategorins ID och söksträngen för filtret "style"
    let products = await getFilteredProducts(type.id, "Dresses");

    // Töm innehållet i wrapper-elementet för att förbereda det för de nya filtrerade produkterna
    document.getElementById("wrapper").innerHTML = "";

    // Fyll sidan med de filtrerade produkterna
    fillpage(products);
}