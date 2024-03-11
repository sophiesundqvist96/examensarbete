import { createNav, createBottonListenWoM, createProductsByCategoryPage} from "./alt1.js";
import { createFrontPage, getMenOrWom } from "../utils/index.js";
import { getPage, createProductPage } from "../product/product.js"

console.log(getPage())
createNav()
createBottonListenWoM()

if(getPage() == "product"){
    createProductPage("1")
}else if(getPage() == "category"){
    document.getElementById("single-product-wrapper").style.display = "none"
    createProductsByCategoryPage()
}else{
    document.getElementById("single-product-wrapper").style.display = "none"
    createFrontPage()   
}
