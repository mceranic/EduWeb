var CommitTabela=(function(){
    //lokalne variable idu ovdje
    var tr;
    var td;
    var br;
    var table;
    var maxColspan = 0;   
    var konstruktor=function(divElement,brojZadataka){
        table  = document.createElement("table");
        table.setAttribute("id", "tabela");
        divElement.appendChild(table);
        var t = document.getElementById("tabela");  
        var h = document.createElement("tr");
        table.appendChild(h);
        var kol1 = document.createElement("th");
        h.appendChild(kol1);
        var kol2 = document.createElement("th");
        h.appendChild(kol2);
        var kolona1 = document.createTextNode("Zadaci");
        kol1.appendChild(kolona1);
        var kolona2 = document.createTextNode("Commiti");
        kol2.appendChild(kolona2);
        for(var i = 0; i < brojZadataka; i++){
            tr = table.insertRow();
            td = tr.insertCell();
            br = i + 1;
            td.innerHTML = "Zadatak " + br;
            td = tr.insertCell();
            td.innerHTML = "";
        }
    return{
    dodajCommit:function(rbZadatka,url){
       // dodavati kolonu u red
       var red = table.rows[rbZadatka]; 
       var duzina = red.cells.length; 
       var z = 1;
       while(z < duzina) {
           if(red.cells[z].innerHTML == "") {
              break;
           }
           z++;
       }
       if(z == duzina) {
        var com = red.insertCell(duzina); // dodaje na kraj red
        com.innerHTML = String(z).link(url);
       }
       else {
        red.cells[z].innerHTML=String(z).link(url);
       }
       for(var i = 1; i < table.rows.length; i++) {
           if(table.rows[i].cells.length-1 > maxColspan) {
               maxColspan = table.rows[i].cells.length-1;
           }
       }
       table.rows[0].cells[1].colSpan = maxColspan;
             for(var j = 1; j < table.rows.length; j++) {
            var l = table.rows[j].cells.length-1;
            if(l < maxColspan) {
              table.rows[j].insertCell(l+1);
              table.rows[j].cells[l+1].colSpan = maxColspan-l;
              table.rows[j].cells[l+1].innerHTML="";
            } 
            }     
    },
    editujCommit:function(rbZadatka,rbCommita,url){
        // provjeriti prvo da li commit postoji
        // ako red ne postoji vratiti -1
        table.rows[rbZadatka].cells[rbCommita].innerHTML = String(rbCommita).link(url);   // radiiiii :))))))))        
    },
    obrisiCommit:function(rbZadatka,rbCommita){
       // brisati kolonu iz reda
    }
    }
    }
    return konstruktor;
    }());

/* window.onload = function () {
    var mojDiv = this.document.getElementById("commiti"); //samo div saljemo
    var tabela = new CommitTabela(mojDiv, 5);
    tabela.dodajCommit(3, "www.etf.ba");
    tabela.dodajCommit(2, "www.etf.ba");
    tabela.dodajCommit(2, "www.etf.ba");
    tabela.dodajCommit(1, "www.etf.ba");
} */