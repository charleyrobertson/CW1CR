$(document).ready(function () {
    let url = window.location.href.toString();
    var li = document.createElement("li");
    var div = document.getElementById("shareLink");
    var date = new Date().toISOString().substring(0,10);
    url = url.concat("/", date);
    
    li.innerHTML = url;

    div.append(h5);
});