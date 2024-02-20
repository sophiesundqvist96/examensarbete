export async function getCategories(){
    const url = 'https://asos-com1.p.rapidapi.com/categories/list-shortened';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f1a5c0054amsh9bfb4fbaa5de186p176f40jsn7c539b1fe4d8',
            'X-RapidAPI-Host': 'asos-com1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result.data
    } catch (error) {
        console.error(error);
    }
}

export const catData = await getCategories()
console.log(catData)



// returnera en array av producter baserat på kategori-id (cid)
export async function getProductsByCatId(catId){
    const url = `https://asos-com1.p.rapidapi.com/products/search-by-category?cid=${catId}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f1a5c0054amsh9bfb4fbaa5de186p176f40jsn7c539b1fe4d8',
            'X-RapidAPI-Host': 'asos-com1.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result)
        return result.data.products
    } catch (error) {
        console.error(error);
    }
}
//getProductByCatId()


export async function getFiltersType(typeNamw){
    const url = 'https://asos-com1.p.rapidapi.com/filters/style?q=Shirts';
    const options = {
	    method: 'GET',
	    headers: {
		    'X-RapidAPI-Key': 'f1a5c0054amsh9bfb4fbaa5de186p176f40jsn7c539b1fe4d8',
		    'X-RapidAPI-Host': 'asos-com1.p.rapidapi.com'
	    }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        return result.data
    } catch (error) {
        console.error(error);
    }
}




// gammalt test har kvar ifall om
async function test1CategoriId(menOrWom, type){
    const url = 'https://asos-com1.p.rapidapi.com/categories/list-shortened';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f1a5c0054amsh9bfb4fbaa5de186p176f40jsn7c539b1fe4d8',
            'X-RapidAPI-Host': 'asos-com1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        // hur man först får om man väljet man eller kvinna result.data.Men
        let menOrWom = result.data.Women
        console.log(menOrWom)
        // hur man går vidare till categorier // här kommer du till tex new in, clothing, dresses, shoes, plus size osv
        let cat = menOrWom.children[4]
        console.log(cat)

        /* hur man kommer till clothing, här kommer man åt bestseller */
        let clothing = cat.children[1]
        console.log(clothing)

        // här går vi in på "shop bu product" för att välja vilken typ av produkt, kan också ta "most wanted" här om vi vill
        let shopByPro = clothing.children[1]
        console.log(shopByPro)

        // hur du får alla olika kläldalternativ, här kan du gå in på ett index och få ut specifikt id
        let clothCategories = shopByPro.children
        console.log(clothCategories)

        //console.log(result.data.Women.children[4].children[1].children[1].children[4])
    } catch (error) {
        console.error(error);
    }
}