export async function getCategories(){
    const url = 'https://asos-com1.p.rapidapi.com/categories/list-shortened';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'bbcc5dc6dbmshafbc92f4854d54cp185cf3jsnc4da281fbdbe',
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
            'X-RapidAPI-Key': 'bbcc5dc6dbmshafbc92f4854d54cp185cf3jsnc4da281fbdbe',
            'X-RapidAPI-Host': 'asos-com1.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result.data.products
    } catch (error) {
        console.error(error);
    }
}
//getProductByCatId()


export async function getFiltersType(typeId){
    const url = `https://asos-com1.p.rapidapi.com/filters/style?q=${typeId}&search_type=ByCategory`;
    const options = {
	    method: 'GET',
	    headers: {
		    'X-RapidAPI-Key': 'bbcc5dc6dbmshafbc92f4854d54cp185cf3jsnc4da281fbdbe',
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

export async function getFiltersColour(typeId){
    const url = `https://asos-com1.p.rapidapi.com/filters/color?q=${typeId}&search_type=ByCategory`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'bbcc5dc6dbmshafbc92f4854d54cp185cf3jsnc4da281fbdbe',
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
export async function getProductsByFilters(catId, styleId){
    console.log(catId)
    console.log*styleId
    const url = `https://asos-com1.p.rapidapi.com/products/search-by-category?cid=${catId}&style=${styleId}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'bbcc5dc6dbmshafbc92f4854d54cp185cf3jsnc4da281fbdbe',
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
