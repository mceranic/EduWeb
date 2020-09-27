function buttonUnesi() {
    var mojDiv = document.getElementById("greska");
    var validacija = new Validacija(mojDiv);
    var nazivGod = document.getElementById("nazivGodine");
    var vjezba = document.getElementById("nazivRepVj");
    var spirala = document.getElementById("nazivRepSp");
    var regex = /wt(P|p)rojekat1\d{4}$/;  // ovdje sam hardkodirala regex, samo zamijenite svoj regex sa mojim :)
    var temp1 = validacija.godina(nazivGod);
    //var temp2 = validacija.repozitorij(vjezba, regex);
    //var temp3 = validacija.repozitorij(spirala, regex);
    //if(temp1 && temp2 && temp3) {
     //   mojDiv.innerHTML = "";
    //    alert("Uspjesna radnja!");
   // }
}
function ucitajGodine() {
    var divGodine = document.getElementById("okvir");
    var godAjax = new GodineAjax(divGodine);
    godAjax.osvjezi();
}

function buttonPonisti() {
    //obrisati polja
    document.getElementById("nazivGod").value = "";
    document.getElementById("nazivRepVje").value = "";
    document.getElementById("nazivRepSpi").value = "";
}
