export async function getCategories(){
    const url = 'https://asos-com1.p.rapidapi.com/categories/list-shortened';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'da01eaad68msh9c525d03d038b2ep15f779jsn5762776e1a7c',
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
            'X-RapidAPI-Key': 'da01eaad68msh9c525d03d038b2ep15f779jsn5762776e1a7c',
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

export async function getFilter(filterType, catId){
    const url = `https://asos-com1.p.rapidapi.com/filters/${filterType}?q=${catId}&search_type=ByCategory`;
    const options = {
	    method: 'GET',
	    headers: {
		    'X-RapidAPI-Key': 'da01eaad68msh9c525d03d038b2ep15f779jsn5762776e1a7c',
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


export async function getFilteredProducts(catId, filterstring){
    const url = `https://asos-com1.p.rapidapi.com/products/search-by-category?cid=${catId}&${filterstring}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'da01eaad68msh9c525d03d038b2ep15f779jsn5762776e1a7c',
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