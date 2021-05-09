$(document).ready(function () {
    let url = window.location.href.toString();
    var h5 = document.createElement("h5");
    var div = document.getElementById("shareLink");
    var date = new Date().toISOString().substring(0,10);
    url = url.concat("/", date);
    
    h5.innerHTML = url;

    div.append(h5);
});