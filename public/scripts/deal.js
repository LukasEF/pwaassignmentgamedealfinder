const thumbnail = document.getElementById("thumbnail");
const gameTitle = document.getElementById("gameTitle");
const salePrice = document.getElementById("salePrice");
const retailPrice = document.getElementById("retailPrice");

const metaIcon = document.getElementById("metaIcon");
const metaScore = document.getElementById("metaScore");

const steamIcon = document.getElementById("steamIcon");
const ratingText = document.getElementById("ratingText");
const ratingPercent = document.getElementById("ratingPercent");

const viewIcon = document.getElementById("viewIcon");

var url = "https://www.cheapshark.com/api/1.0/deals?id=";
url+=sessionStorage.getItem("dealID");
var metaURL = "https://www.metacritic.com";
var steamURL = "https://store.steampowered.com/app/";
var viewURL = "https://www.cheapshark.com/redirect?dealID=";
var thumbURL = "";
var title = "";

// Fetch the URL immediately
fetch(url).then(function(response) {
    return response.json()
}).then(function(results) {
    thumbURL = results.gameInfo.thumb;
    title = results.gameInfo.name;
    thumbnail.outerHTML = `<img id="thumbnail" src="${results.gameInfo.thumb}" alt="${results.gameInfo.thumb}" height="200" width="200">`;
    gameTitle.innerText = `${results.gameInfo.name}`;
    salePrice.innerText = `Sale Price: $${results.gameInfo.salePrice}`;
    retailPrice.innerText = `Retail Price: $${results.gameInfo.retailPrice}`;

    if(results.gameInfo.metacriticScore === null){
        metaScore.innerText = `Metascore: N/A`;
    }
    else{
        metaScore.innerText = `Metascore: ${results.gameInfo.metacriticScore}`;
    }

    if(results.gameInfo.metacriticLink === null){
        metaIcon.outerHTML = `<a id="metaIcon" href="https://www.metacritic.com"> <img src="https://pwagamedealfinder-lf.web.app/images/metacritic.png" alt="Metacritic Icon" height="100" width="100"> </a>`;
    }
    else{
        const finalMeta = metaURL + results.gameInfo.metacriticLink;
        metaIcon.outerHTML = `<a id="metaIcon" href="${finalMeta}"> <img src="https://pwagamedealfinder-lf.web.app/images/metacritic.png" alt="Metacritic Icon" height="100" width="100"> </a>`;
    }

    if(results.gameInfo.steamAppID === null){
        steamIcon.outerHTML = `<a id="steamIcon" href="https://store.steampowered.com"> <img src="https://pwagamedealfinder-lf.web.app/images/steam.png" alt="Steam Icon" height="100" width="100"> </a>`;
    }
    else{
        const finalSteam = steamURL + results.gameInfo.steamAppID;
        steamIcon.outerHTML = `<a id="steamIcon" href="${finalSteam}"> <img src="https://pwagamedealfinder-lf.web.app/images/steam.png" alt="Steam Icon" height="100" width="100"> </a>`;
    }

    if(results.gameInfo.steamRatingText === null){
        ratingText.innerText = `Steam Rating: N/A`;
    }
    else{
        ratingText.innerText = `Steam Rating: ${results.gameInfo.steamRatingText}`;
    }

    if(results.gameInfo.steamRatingPercent === null){
        ratingPercent.innerText = `Steam Rating Percent: N/A`;
    }
    else{
        ratingPercent.innerText = `Steam Rating Percent: ${results.gameInfo.steamRatingPercent}%`;
    }

    const finalView = viewURL + sessionStorage.getItem("dealID");
    viewIcon.outerHTML = `<a id="viewIcon" href="${finalView}"> <img src="https://pwagamedealfinder-lf.web.app/images/cart.png" alt="Shopping Cart Icon" height="100" width="100"> </a>`;

}).catch(function(error) {
    alert("Error fetching or converting… " + error);
})

function addToWishList(){
    localStorage.setItem("Game " + (localStorage.length).toString(), title + " ;:; " + thumbURL);
}