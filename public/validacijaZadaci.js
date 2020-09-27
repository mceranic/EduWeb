function buttonSearch() {
    var mojDiv = document.getElementById("greska");
    var validacija = new Validacija(mojDiv);
    var iIp = document.getElementById("ime");
    if(validacija.ime(iIp)) {
        mojDiv.innerHTML = "";
        alert("Uspjesna radnja!");
    }
}