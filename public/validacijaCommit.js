function postaviZadatke() {
    var tabelaDiv = this.document.getElementById("commiti"); 
    var brZadataka = document.getElementById("brojZadataka").value;
    tabela = new CommitTabela(tabelaDiv, brZadataka);
}

function buttonDodaj() {
    mojDiv = document.getElementById("greska");
    validacija = new Validacija(mojDiv);
    var urlCom = document.getElementById("url").value;
    var temp = validacija.url(urlCom);
    if(temp) {
        mojDiv.innerHTML = "";
        tabela.dodajCommit(document.getElementById("brZadatka").value, urlCom);
    }    
}

 function buttonEdituj() {    
    var urlCom = document.getElementById("url").value;
    var temp = validacija.url(urlCom);
    if(temp) {
        mojDiv.innerHTML = "";
        tabela.editujCommit(document.getElementById("brZadatka").value, document.getElementById("brCommita").value, urlCom);
    }
} 

function buttonObrisi() {
    // provjeriti prvo da li commit postoji
}