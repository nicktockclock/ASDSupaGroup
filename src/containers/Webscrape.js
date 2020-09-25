import { findAllInRenderedTree } from "react-dom/test-utils";

const getJSON = async url => {
    try {
        const response = await fetch(url);
        if(!response.ok) // check if response worked (no 404 errors etc...)
        throw new Error(response.statusText);

        const data = await response.json(); // get JSON from the response
        return data; // returns a promise, which resolves to this data value
    } catch(error) {
        return error;
    }
}

export async function getImage(query) {
    //documentation: https://pixabay.com/api/docs/
    //API KEY: 18450465-6164ddf437f4967c4e5570f90

    var API_KEY = '18450465-6164ddf437f4967c4e5570f90';
    var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent(query);
    
    console.log(URL); 

    
    var return_string = await getJSON(URL).then(data => {
        if (parseInt(data.totalHits) > 0) {
            var hits = data.hits;
            for (var key in hits) {
                if (data.hits.hasOwnProperty(key)) {
                    console.log(key + " -> " + hits[key].largeImageURL);
                    return hits[key].largeImageURL;
                }
            }
        }
        return "";
    }).catch(error => {
        console.error("error!:" + error);
        return "";
    });
    
    return return_string;
}

