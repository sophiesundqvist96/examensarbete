import { catData, getFiltersType } from "../utils/api.js";
import { fillpage } from "../utils/index.js"


let womenNavData = getNavDataWom()
createNav(womenNavData)
    // createBottonListenWoM()

function getNavDataWom() {
    let wayToClothingCats = catData.Women.children[4].children[3].children[1].children
    let newIn = wayToClothingCats[2]
    let bestsellers = wayToClothingCats[1]
    let clothing = catData.Women.children[4].children[3]
    let shoes = catData.Women.children[4].children[5];
    let accessories = catData.Women.children[4].children[8];
    let brands = catData.Women.children[4].children[9];
    let sale = catData.Women.children[4].children[0]

    let navData = [newIn, bestsellers, clothing, shoes, accessories, brands, sale]
    return navData

}

function getNavDataMen() {
    let wayToClothingCats = catData.Men.children[4].children[3].children[1].children

    let newIn = wayToClothingCats[2]
    let bestsellers = wayToClothingCats[1]
    let clothing = catData.Men.children[4].children[3]
    let shoes = catData.Men.children[4].children[5];
    let accessories = catData.Men.children[4].children[8];
    let brands = catData.Men.children[4].children[9];
    let sale = catData.Men.children[4].children[1]

    let navData = [newIn, bestsellers, clothing, shoes, accessories, brands, sale]
    return navData
}

// just nu hårdkodas vägen här men det behövs ändras eftersom vägen ser olika ut beroende på män eller kvinna
async function createNav(navData) {
    console.log(navData)
    navData.forEach(titleData => {
        console.log(titleData)
        let titleDiv = document.createElement("div")
        titleDiv.classList.add("nav-title")
        titleDiv.innerHTML = titleData.title
        if (titleData.title != "Clothing") {
            titleDiv.addEventListener("click", async() => {
                document.getElementById("wrapper").innerHTML = ""
                switch (titleData.title) {
                    case "New in":
                    case "Bestsellers":
                        await fillpage(titleData.categoryId)
                        break;
                    case "Sale":
                        fillpage(28250) // detta är såå hårdkodat, måsta komma på ett bättre sätt 
                        break;
                }
            })

        } else {
            createHoverDiv(titleDiv, catData)
            titleDiv.addEventListener("mouseenter", () => {
                // document.getElementById("hover-div").classList.remove("hidden")
            })

            titleDiv.addEventListener("mouseleave", () => {
                // document.getElementById("hover-div").classList.add("hidden")
            })
        }

        document.getElementById("navigation").append(titleDiv)
    })

}

// för att ändra till män och kvinnor.. create nav är dock hårdkodad efter kvinnor så den behöver ändras
function changeToMen() {
    let navWrapper = document.getElementById("navigation")
    if (navWrapper.classList.contains("women")) {
        // här borde också läggas till att man kommer till "första sidan" som är anpassad för män
        navWrapper.innerHTML = ""
        navWrapper.classList.remove("women")
        navWrapper.classList.add("men")
        let menNavData = getNavDataMen()
        createNav(menNavData)
    }
}

function changeToWomen() {
    let navWrapper = document.getElementById("navigation")
    if (navWrapper.classList.contains("men")) {
        navWrapper.innerHTML = ""
            // här borde också läggas till att man kommer till "första sidan" som är anpassad för kvinnor
        navWrapper.classList.remove("men")
        navWrapper.classList.add("women")
        let wommenNavData = getNavDataWom()
        createNav(wommenNavData)

    }
}

// function createBottonListenWoM() {
//     let womenButton = document.getElementById("women")
//     let menButton = document.getElementById("men")
//     womenButton.addEventListener("click", changeToWomen)
//     menButton.addEventListener("click", changeToMen)
// }

function createHoverDiv(titleDiv, catData) {
    let hoverDiv = document.createElement("div");
    hoverDiv.id = "hover-div";
    let womenData = catData.Women.children[4].children[3].children[1].children;
    let menData = catData.Men.children[4].children[3].children[1].children;


    let categoriesWrapper = createCategories(womenData, menData);
    hoverDiv.appendChild(categoriesWrapper);

    titleDiv.append(hoverDiv);
}

function createCategories(womenData, menData) {
    let catWrapper = document.createElement("div");
    catWrapper.id = "cat-wrapper";

    // Women Categories
    let womenDiv = document.createElement("div");
    let womenLabel = document.createElement("p");
    womenLabel.innerHTML = "WOMEN";
    womenDiv.appendChild(womenLabel);

    womenData.forEach((cat, index) => {
        let category = document.createElement("p");
        category.innerHTML = cat.title;
        womenDiv.appendChild(category);
        category.addEventListener("click", () => {
            fillpage(cat.categoryId);
            createFilterType(cat.title);
        });
    });

    // Men Categories
    let menDiv = document.createElement("div");
    let menLabel = document.createElement("p");
    menLabel.innerHTML = "MEN";
    menDiv.appendChild(menLabel);

    menData.forEach((cat, index) => {
        let category = document.createElement("p");
        category.innerHTML = cat.title;
        menDiv.appendChild(category);
        category.addEventListener("click", () => {
            fillpage(cat.categoryId);
            createFilterType(cat.title);
        });
    });


    catWrapper.appendChild(womenDiv);
    catWrapper.appendChild(menDiv);

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