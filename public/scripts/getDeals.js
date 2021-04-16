const outputTbody = document.getElementById("output");
const url = "https://www.cheapshark.com/api/1.0/deals";
let imageURL = "https://www.cheapshark.com";

// Fetch the URL immediately
fetch(url).then(function(response) {
    return response.json()
}).then(function(results) {
    // Build up some HTML as a string
    let tbodyHtml = "";

    for (const item of results) {
        imageURL = "https://www.cheapshark.com/img/stores/logos/";
        imageURL += item.storeID-1;
        imageURL += ".png";
        tbodyHtml += `<tr><td>${item.title}</td><td>$${item.normalPrice}</td><td>$${item.salePrice}</td><td>${parseFloat(item.savings).toFixed(2)}%</td><td><img src="${item.thumb}" alt="${item.title}" onclick=viewDeal("${item.dealID}") height=100 width=100></img></td><td><img src="${imageURL}" alt="Store Icon" height=100 width=100></img></td></tr>`;
    }

    // Set the HTML string as the contents of the output list
    outputTbody.innerHTML = tbodyHtml;

}).catch(function(error) {
    console.log("Error fetching or converting… ", error);
})

function viewDeal(dealID){
    sessionStorage.setItem("dealID", dealID);
    window.open("https://pwagamedealfinder-lf.web.app/deal.html");
}