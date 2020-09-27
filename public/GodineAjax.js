var GodineAjax = (function(){   // zadatak 6
   function pomocnaFun(divSadrzaj) {
      var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {  // anonimna fja
            // ovdje napraviti div godine
            if(ajax.readyState == 4 && ajax.status == 200) {
               var rezultat = ajax.responseText; // godine.json
               var pars_Tekst = JSON.parse(rezultat);  // pretvara tekst u js objekat
               console.log('okeeej');
               var pomString = '';
               for(var i = 0; i < pars_Tekst.length; i++) {
                     pomString += '<div class="godina">';
                     pomString += '<p>' + pars_Tekst[i].nazivGod + '</p>';
                     pomString += '<p>' + pars_Tekst[i].nazivRepVje + '</p>';
                     pomString += '<p>' + pars_Tekst[i].nazivRepSpi + '</p>';
                     pomString += '</div>';
               }
               divSadrzaj.innerHTML = pomString;
            }         
        }
        ajax.open("GET","http://localhost:8080/godine",true);
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send();
   }
      var konstruktor = function(divSadrzaj){
        pomocnaFun(divSadrzaj);
    return {
    osvjezi:function(){
      pomocnaFun(divSadrzaj);
      }
    }
    }
    return konstruktor;
    }());

  //  module.exports=GodineAjax;
    