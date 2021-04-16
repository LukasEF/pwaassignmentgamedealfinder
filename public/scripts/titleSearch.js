const outputTbody = document.getElementById("output");
const form = document.getElementById("searchForm");
const title = document.getElementById("title");
const steamID = document.getElementById("steamappid");
const limit = document.getElementById("limit");
const exact = document.getElementById("exact");
const gamesURL = "https://www.cheapshark.com/api/1.0/games?";
const imageURL = "https://pwagamedealfinder-lf.web.app/images/viewDeal.png";


function search(){
    var valid = false;
    let values = [];
    values.push(gamesURL);

    if(title.value === '' || title.value === null){
        if(steamID.value.length === 0){
            valid = false;
        }
        else{
            valid = true;
            values.push("steamAppID=" + steamID.value);
        }
    }
    else{
        valid = true;
        values.push("title=" + title.value);
        if(steamID.value != null){
            values.push("&steamAppID=" + steamID.value);
        }
    }

    if(limit.value.length != 0){
        values.push("&limit=" + limit.value);
    }
    if(exact.checked){
        values.push("&exact=1");
    }

    if(valid === true){
        let finalURL = values.join("");

        fetch(finalURL).then(function(response) {
            return response.json()
        }).then(function(results) {
            // Build up some HTML as a string
            let tbodyHtml = "";

            if(results.length === 0){
                tbodyHtml = `<tr><td>No results</td></tr>`
            }
            else{
                for (const item of results) {
                    tbodyHtml += `<tr><td>${item.gameID}</td><td>${item.external}</td><td>$${item.cheapest}</td><td><img src="${item.thumb}" alt="${item.title}" onclick=viewDeal("${item.cheapestDealID}") height=100 width=100></img></td></tr>`;
                }
            }
    
            // Set the HTML string as the contents of the output list
            outputTbody.innerHTML = tbodyHtml;
    
        }).catch(function(error) {
            alert("Error fetching or converting… " + error);
        })
    }
    else{
        alert("Please enter a title or Steam App ID");
    }
}

function viewDeal(dealID){
    sessionStorage.setItem("dealID", dealID);
    window.open("https://pwagamedealfinder-lf.web.app/deal.html");
}

