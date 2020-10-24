function random(max) {  //between 0 and max
    return Math.floor(Math.random() * Math.floor(max)); 
} 

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
    URL += "&per_page=3" //min 3 max 200
    URL += "&orientation=horizontal";
    URL += "&image_type=photo";
    URL += "&category=food";
    URL += "&safesearch=true";
    
    //console.log("API Call=" + URL); 
    
    var image_url = await getJSON(URL).then(data => {
        if (parseInt(data.totalHits) > 0) {
            var hits = data.hits;
            for (var key in hits) {
                if (data.hits.hasOwnProperty(key)) {
                    //console.log(key + " -> " + hits[key].largeImageURL);

                    //var originalURL = hits[key].largeImageURL;
                    var webURL = hits[key].webformatURL;
                    return webURL;
                }
            }
        }
        
        return "";
    }).catch(error => {
        console.error("error!:" + error);
        return "";
    });

    return image_url;
}

export const ratingChanged = (newRating) => {
    console.log(newRating);
};

export function getRandomRating() {
    return Math.floor(Math.random() * 2) + 3 //between 3-5 stars
}

export function getRandomDifficulty() {
    let array = ["Easy", "Medium", "Hard"];
    let index = random(array.length - 1);
    return array[index];
}

export function getRandomDuration() {
    let array = ["30 mins", "45 mins", "60 mins", "90 mins", "120 mins"];
    let index = random(array.length - 1);
    return array[index];
}

export function parseDuration(value) {
    if (!isNaN(value)) {
        if (value < 120) {
            return value + "mins";
        } else {
            return Math.round(value/60) + "hrs";
        }
    }
    return value;
}

export function parseCalories(value) {
    return (!isNaN(value)) ? value + " cal." : value;
}

export function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}