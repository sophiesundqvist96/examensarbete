import { createNav, createBottonListenWoM, createProductsByCategoryPage} from "./alt1.js";
import { createFrontPage, getMenOrWom } from "../utils/index.js";
import { getPage, createProductPage } from "../product/product.js"

console.log(getPage())
createNav()
createBottonListenWoM()

if(getPage() == "product"){
    createProductPage()
    if(getMenOrWom() == "men"){
        document.getElementById("men").style.fontWeight = "bold"
        document.getElementById("women").style.fontWeight = "200"
    }else{
        document.getElementById("women").style.fontWeight = "bold"
        document.getElementById("men").style.fontWeight = "200"
    }
}else if(getPage() == "category"){
    createProductsByCategoryPage()
}else{

    createFrontPage()   
}
