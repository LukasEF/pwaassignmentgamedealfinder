const outputTbody = document.getElementById("output");

var tHTML = "";
var title = "";
var thumburl = "";
var words = [];

for(i = 0; i < localStorage.length; i++){
    words = localStorage.getItem("Game " + i.toString()).split(" ;:; ");
    title = words[0];
    console.log("Title " + i.toString() + title);
    thumburl = words[1];
    console.log("Thumb " + i.toString() + title);
    tHTML += `<tr><td>${title}</td><td><img src="${thumburl}" alt="${thumburl}" height=100 width=100></img></td></tr>`;
}

outputTbody.innerHTML = tHTML;