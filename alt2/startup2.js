import { createNav, createFrontPage, fillPageFilterWomen, fillPageFilterMen } from "./alt2.js";
import { createProductPage, getPage } from "../product/product.js";
import { catData } from "../utils/api.js";
import { getMenOrWom, getCatIdFromUrl, getTitleFromUrl, getCategoryTitleFromUrl, getShopByFromUrl } from "../utils/index.js";

createNav()

if(getPage() == "product"){
    createProductPage("2")
}else if(getPage() == "category"){
    let catId = getCatIdFromUrl()
    let title = getTitleFromUrl()
    let categoryTitle = getCategoryTitleFromUrl()
    let shopBy = getShopByFromUrl()
    if(getMenOrWom() == "men"){
        let menData = catData.Men.children.find(child => child.title == "Categories").children.find(child => child.title == categoryTitle).children.find(child => child.title == shopBy).children
        fillPageFilterMen(catId, menData, title)
    }else{
        let womenData = catData.Women.children.find(child => child.title == "Categories").children.find(child => child.title == categoryTitle).children.find(child => child.title == shopBy).children
        fillPageFilterWomen(catId, womenData, title)
    }
}else{
    createFrontPage()   
}