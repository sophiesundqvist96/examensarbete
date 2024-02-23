import { catData, getProductsByCatId, getFilter, getFilteredProducts } from "../utils/api.js";
import { fillpage } from "../utils/index.js"



createNav()
    // createBottonListenWoM()

// function getNavDataWom() {
//     let wayToClothingCats = catData.Women.children[4].children[3].children[1].children
//     let newIn = wayToClothingCats[2]
//     let bestsellers = wayToClothingCats[1]
//     let clothing = catData.Women.children[4].children[3]
//     let shoes = catData.Women.children[4].children[5];
//     let accessories = catData.Women.children[4].children[8];
//     let brands = catData.Women.children[4].children[9];
//     let sale = catData.Women.children[4].children[0]

//     let navData = [newIn, bestsellers, clothing, shoes, accessories, brands, sale]
//     return navData

// }

// function getNavDataMen() {
//     let wayToClothingCats = catData.Men.children[4].children[3].children[1].children

//     let newIn = wayToClothingCats[2]
//     let bestsellers = wayToClothingCats[1]
//     let clothing = catData.Men.children[4].children[3]
//     let shoes = catData.Men.children[4].children[5];
//     let accessories = catData.Men.children[4].children[8];
//     let brands = catData.Men.children[4].children[9];
//     let sale = catData.Men.children[4].children[1]

//     let navData = [newIn, bestsellers, clothing, shoes, accessories, brands, sale]
//     return navData
// }

// just nu hårdkodas vägen här men det behövs ändras eftersom vägen ser olika ut beroende på män eller kvinna
// async function createNav(navData) {
//     console.log(navData)
//     navData.forEach(titleData => {
//         console.log(titleData)
//         let titleDiv = document.createElement("div")
//         titleDiv.classList.add("nav-title")
//         titleDiv.innerHTML = titleData.title
//         if (titleData.title != "Clothing") {
//             titleDiv.addEventListener("click", async() => {
//                 document.getElementById("wrapper").innerHTML = ""
//                 switch (titleData.title) {
//                     case "New in":
//                     case "Bestsellers":
//                         await fillpage(titleData.categoryId)
//                         break;
//                     case "Sale":
//                         fillpage(28250) // detta är såå hårdkodat, måsta komma på ett bättre sätt 
//                         break;
//                 }
//             })

//         } else {
//             createHoverDiv(titleDiv, catData)
//             titleDiv.addEventListener("mouseenter", () => {
//                 // document.getElementById("hover-div").classList.remove("hidden")
//             })

//             titleDiv.addEventListener("mouseleave", () => {
//                 // document.getElementById("hover-div").classList.add("hidden")
//             })
//         }

//         document.getElementById("navigation").append(titleDiv)
//     })

// }

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

// för att ändra till män och kvinnor.. create nav är dock hårdkodad efter kvinnor så den behöver ändras
// function changeToMen() {
//     let navWrapper = document.getElementById("navigation")
//     if (navWrapper.classList.contains("women")) {
//         // här borde också läggas till att man kommer till "första sidan" som är anpassad för män
//         navWrapper.innerHTML = ""
//         navWrapper.classList.remove("women")
//         navWrapper.classList.add("men")
//         let menNavData = getNavDataMen()
//         createNav(menNavData)
//     }
// }

// function changeToWomen() {
//     let navWrapper = document.getElementById("navigation")
//     if (navWrapper.classList.contains("men")) {
//         navWrapper.innerHTML = ""
//             // här borde också läggas till att man kommer till "första sidan" som är anpassad för kvinnor
//         navWrapper.classList.remove("men")
//         navWrapper.classList.add("women")
//         let wommenNavData = getNavDataWom()
//         createNav(wommenNavData)

//     }
// }

// function createBottonListenWoM() {
//     let womenButton = document.getElementById("women")
//     let menButton = document.getElementById("men")
//     womenButton.addEventListener("click", changeToWomen)
//     menButton.addEventListener("click", changeToMen)
// }

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
            await createAllFilters(cat.categoryId)
            products = await getProductsByCatId(cat.categoryId)
            fillpage(products)

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
            await createAllFilters(cat.categoryId)
            products = await getProductsByCatId(cat.categoryId)
            fillpage(products)

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



// function createCategoriesMen(allCategories) {
//     console.log(allCategories)
//     let catWrapper = document.createElement("div")
//     catWrapper.id = "cat-wrapper"

//     let div1 = document.createElement("div")
//     let div2 = document.createElement("div")
//     let i = 0;
//     allCategories.forEach(cat => {
//         i++
//         let categori = document.createElement("p")
//         categori.innerHTML = cat.title
//         if (i < 18) {
//             div1.appendChild(categori)
//         } else {
//             div2.appendChild(categori)
//         }
//         categori.addEventListener("click", () => {
//             fillpage(cat.categoryId)
//                 // document.getElementById("hover-div").classList.add("hidden")
//             createFilterType(cat.title)
//         })
//     })

//     catWrapper.appendChild(div1)
//     catWrapper.appendChild(div2)
//     return catWrapper
// }

async function createAllFilters(catId) {
    let filterTypes = ["style", "color", "brand", "size", "design"]

    // , "body-fit", "discount", "range", "price-range"] // avkommenterat för att ta mindre fetch medan jag stylar

    let allFilterContainer = document.getElementById("all-filters-container")


    let allFilterWrapper = document.getElementById("all-filters")
    allFilterWrapper.innerHTML = ""

    // Skapa en array för att lagra alla asynkrona anrop
    let asyncFilterPromises = filterTypes.map(async filter => {
        let arrayOfFilters = await getFilter(filter, catId); // Vänta på att getFilter ska slutföras
        let filterWrapper = createFilters(arrayOfFilters, filter, catId);
        console.log(arrayOfFilters)
        console.log(filter)
        console.log(catId)
        return filterWrapper;
    });

    // Vänta på att alla asynkrona anrop ska slutföras innan du fortsätter
    let filterWrappers = await Promise.all(asyncFilterPromises);

    // Lägg till alla filterWrappers till allFilterWrapper
    filterWrappers.forEach(filterWrapper => {
        allFilterContainer.appendChild(filterWrapper);
    });

    allFilterContainer.appendChild(allFilterWrapper)
}

function createFilters(arrayOfFilters, filterTitle, catId) {
    console.log(arrayOfFilters)
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
            console.log(buttonDiv.querySelector("i"))

        } else {
            content.style.display = "block";
            buttonDiv.querySelector("i").classList.remove("fa-angle-down")
            buttonDiv.querySelector("i").classList.add("fa-angle-up")
            console.log(buttonDiv.querySelector("i"))
        }
    })

    let dropdownWrapper = document.createElement("div")
    dropdownWrapper.classList.add("dropdown-content")

    filterWrapper.append(buttonDiv, dropdownWrapper)

    if (arrayOfFilters != null) { /// om den är null måsta vi göra något annat för att visa att det inte finns fler alternativ
        arrayOfFilters.forEach(filter => {
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
            const underFiltersContainer = document.getElementById('under-filters');
            let selectedFilters = []; // Array för att lagra valda filternamn

            checkBox.addEventListener("click", () => {
                if (checkBox.checked) {
                    filterOnCheckedItems(filterTitle, filter.id, "add", catId);

                    // Lägg till filternamnet i arrayen av valda filter
                    selectedFilters.push(filter.name);

                    selectedFilters.forEach(filterName => {
                        const filterNameParagraph = document.createElement("p");
                        filterNameParagraph.classList.add("filterNameParagraph")
                        filterNameParagraph.innerHTML = filterName;
                        underFiltersContainer.appendChild(filterNameParagraph);

                    });

                    // Lägg till den gemensamma <p>-elementet i behållaren
                } else {
                    filterOnCheckedItems(filterTitle, filter.id, "delete", catId);

                    const filterNameParagraphs = underFiltersContainer.querySelectorAll(`p`);
                    filterNameParagraphs.forEach(paragraph => {
                        if (paragraph.textContent.trim() === filter.name) {
                            underFiltersContainer.removeChild(paragraph);
                            // Ta bort filternamnet från arrayen av valda filter
                            const index = selectedFilters.indexOf(filter.name);
                            if (index !== -1) {
                                selectedFilters.splice(index, 1);
                            }
                        }
                    });
                }
            });
        })
    }
    return filterWrapper
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

    let products = await getFilteredProducts(catId, searchString)
    document.getElementById("wrapper").innerHTML = ""
    fillpage(products)
}


// async function createFilterType(type) {
//     let filterWrapper = document.createElement("div")
//     filterWrapper.classList.add("filter-wrapper")
//     let allTypeFilter = await getFiltersType(type)
//     allTypeFilter.forEach(type => {
//         let typDiv = document.createElement("div")
//         typDiv.innerHTML = type.name
//     })
// }