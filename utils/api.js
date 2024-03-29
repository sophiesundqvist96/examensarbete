export async function getCategories() {
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


// returnera en array av producter baserat på kategori-id (cid)
export async function getProductsByCatId(catId, page) {
    const url = `https://asos-com1.p.rapidapi.com/products/search-by-category?cid=${catId}&page=${page}`;
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
        //console.log(result)
        return result.data.products
    } catch (error) {
        console.error(error);
    }
}

export async function getFilter(filterType, catId) {
    const url = `https://asos-com1.p.rapidapi.com/filters/${filterType}?q=${catId}&search_type=ByCategory`;
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
        //console.log(result);
        return result.data
    } catch (error) {
        console.error(error);
    }
}


export async function getFilteredProducts(catId, filterstring, page) {
    const url = `https://asos-com1.p.rapidapi.com/products/search-by-category?cid=${catId}&${filterstring}&page=${page}`;
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

// kanske ej behövs 
export async function getProductByProductUrl(productUrl) {
    const url = `https://asos-com1.p.rapidapi.com/products/detail?url=${productUrl}`;
    //console.log(url)
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f1a5c0054amsh9bfb4fbaa5de186p176f40jsn7c539b1fe4d8',
            'X-RapidAPI-Host': 'asos-com1.p.rapidapi.com'
        }
    }

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result.data
    } catch (error) {
        console.error(error);
    }
}


export async function getSimilarProducts(catId) {
    const url = `https://asos-com1.p.rapidapi.com/products/list-similarities?id=${catId}`;
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
        //console.log(result.data);
        return result.data
    } catch (error) {
        console.error(error);
    }
}