import { catData, getFiltersType, getProductsByCatId, getProductsByFilters } from "../utils/api.js";
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
            console.log(cat)
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

async function createFilterType(type) {
    let filterWrapper = document.createElement("div")
    filterWrapper.classList.add("filter-wrapper")
    let allTypeFilter = await getFiltersType(type)
    allTypeFilter.forEach(type => {
        let typDiv = document.createElement("div")
        typDiv.innerHTML = type.name
    })
}