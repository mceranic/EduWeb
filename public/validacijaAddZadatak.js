function buttonDodaj() {
    var mojDiv = document.getElementById("greska");
    var validacija = new Validacija(mojDiv);
    var n = document.getElementById("naziv");
    var temp = validacija.naziv(n);
    if(temp) {
        mojDiv.innerHTML = "";
        alert("Uspjesna radnja!");
    }
}