//const dataBase = require('./db.js');

function postaviGodine() { 

    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
	    if (ajax.readyState == 4 && ajax.status == 200) {
            var rezultat = ajax.responseText; // godine.json
            var godine = JSON.parse(rezultat);  // pretvara tekst u js objekat
            var god1 = document.getElementsByName("sGodine")[0];
            var god2 = document.getElementsByName("sGodine")[1];
            for(var i = 0; i < godine.length; i++) {
                god1.add(new Option(String(godine[i].nazivGod), godine[i].id));
                god2.add(new Option(String(godine[i].nazivGod), godine[i].id));
            }                    
           // document.getElementById("sGodine").innerHTML = god;                        
        }
    }
    ajax.open("GET","http://localhost:8080/godine",true);
    ajax.setRequestHeader("Content-Type", "application/json")
    ajax.send();
}

function postaviVjezbe() {           
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
	    if (ajax.readyState == 4 && ajax.status == 200) {
            var rezultat = ajax.responseText; // godine.json
            var vjezbe = JSON.parse(rezultat);  // pretvara tekst u js objekat
            var vje1 = document.getElementsByName("sVjezbe")[0];
            var vje2 = document.getElementsByName("sVjezbe")[1];
            for(var i = 0; i < vjezbe.length; i++) {
                vje1.add(new Option(vjezbe[i].naziv, vjezbe[i].id));
                vje2.add(new Option(vjezbe[i].naziv, vjezbe[i].id));
            }                    
            //document.getElementById("sGodine") = god;                        
        }
    }
    ajax.open("GET","http://localhost:8080/vjezbe",true);
    ajax.setRequestHeader("Content-Type", "application/json")
    ajax.send();
}
function postaviZadatke() {           
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
	    if (ajax.readyState == 4 && ajax.status == 200) {
            var rezultat = ajax.responseText; // godine.json
            var zadaci = JSON.parse(rezultat);  // pretvara tekst u js objekat
            var zad = document.getElementsByName("sZadatak")[0];
            for(var i = 0; i < zadaci.length; i++) {
                zad.add(new Option(zadaci[i].naziv));
            }                    
            //document.getElementById("sGodine") = god;                        
        }
    }
    ajax.open("GET","http://localhost:8080/dohvatiZadatke",true);
    ajax.setRequestHeader("Content-Type", "application/json")
    ajax.send();
}

// ajax ti treba da ispisujes vrijednosti iz baze u select-e