var Validacija=(function(){
    //lokalne variable idu ovdje
    var greske = [];
    greske.push("Sljedeća polja nisu validna:");
    var updatePoruke = function(){
        var pom = [];
        divElementPoruke.innerHTML = "";            
        for(var i = 0; i < greske.length; i++){
            pom.push(greske[i]);
        }
        pom.pop();
        for(var i = 0; i < pom.length; i++){
            divElementPoruke.innerHTML += pom[i];
        }
        divElementPoruke.innerHTML += '!';
    }
    var dodajGresku = function(poruka){
        var postoji = false;
        for(var i = 0; i < greske.length; i++){
            if(greske[i] == poruka){
                postoji = true;
                break;
            }
        }
        if(postoji == false){
            greske.push(poruka);
            greske.push(',');
            updatePoruke();
        }
    }
    var ukloniGresku = function(poruka){
        var pom = 1;
        var br = 2;
        for(var i = 1; i < greske.length; i++){
            if(greske[i] == poruka){
                pom = i;
                break;             
            }                
        }
        if(pom == greske.length-2 && pom ==1) {
            br = 1;
        }
        else if(pom == greske.length-1 && pom != 1){
            //pom -= 1;          
        }
        greske.splice(pom,br);
        updatePoruke();
        //greske = greske.replace(poruka, "");
        //updatePoruke();
    }
    var konstruktor=function(divElementPoruke){
        return{ 
        ime:function(imeIPrezime){
            var regIP = /^[A-ZŠĐČĆŽ]'?[a-zšđčćž]+(([\s|-]?[A-ZŠĐČĆŽ]'?[a-zšđčćž]+){1,3})?$/;
            if(!regIP.test(imeIPrezime.value)) { 
                imeIPrezime.style.background = "orangered";
                dodajGresku("ime");
                return false;
            } 
            else {
                imeIPrezime.style.background = "white";
                //document.getElementById("ime").value = '';
                ukloniGresku("ime");
                return true;
            }
        },     
        godina:function(akgod){
            var regAkgod = /^20\d{2}\/20\d{2}$/g;
            var pom = akgod.value;
                    if(regAkgod.test(pom)){
                        var a = parseInt(pom[2])*10+parseInt(pom[3]);
                        var b = parseInt(pom[7])*10+parseInt(pom[8]);
                        if(a+1 != b){
                            dodajGresku("godina");
                            akgod.style.background = "orangered";
                            return false;
                        }
                        
                    }
                    else if(!regAkgod.test(pom)) {
                        dodajGresku("godina");
                        akgod.style.background = "orangered";
                        return false;
                    }
                    else {
                        akgod.style.background = "white";
                        ukloniGresku("godina");
                        return true;
                    }                     
        },
        repozitorij:function(nazivRepozitorija,regRepo){
            if(!regRepo.test(nazivRepozitorija.value)) {
                dodajGresku("repozitorij");
                nazivRepozitorija.style.background = "orangered";
                nazivRepozitorija.style.background = "orangered";
                return false;
            } 
            else {
                nazivRepozitorija.style.background = "white";
                nazivRepozitorija.style.background = "white";
                ukloniGresku("repozitorij");
                return true;
            }
        },
        index:function(indeksInput){
            var regIndex = /^((1[4-9])|20)\d{3}$/;
            if(!regIndex.test(indeksInput.value)) {                
                dodajGresku("index");
                indeksInput.style.background = "orangered";
                return false;
            } 
            else {
                indeksInput.style.background = "white";
                ukloniGresku("index");
                return true;
            }
        },
        naziv:function(nazivInput){
            var regNaziv = /^[a-zA-Z][a-zA-Z0-9\\\/\-\"'!?:;,]*[0-9a-z]$/;
            var pom = nazivInput.value; 
            var pomReg = /[a-z]/gi;
            var br = pom.match(pomReg);
            if(!regNaziv.test(pom) || (br.length < 3)) {
                dodajGresku("naziv");
                nazivInput.style.background = "orangered";
                return false;
            } 
            else {
                nazivInput.style.background = "white";
                ukloniGresku("naziv");
                return true;
            }

        },
        password:function(pass){
            var regPass=/(^(?=.*[a-z].*[a-z])(?=.*[A-Z].*[A-Z])(\d*)[a-zA-Z0-9\S]{8,}$)|(^(?=.*[a-z].*[a-z])(?=.*\d.*\d)([A-Z]*)[a-zA-Z0-9\S]{8,}$)|(^(?=.*\d.*\d)(?=.*[A-Z].*[A-Z])([a-z]*)[a-zA-Z0-9\S]{8,}$)/;
            if(!regPass.test(pass.value)) {
                dodajGresku("password");
                pass.style.background = "orangered";
                return false;
            } 
            else {
                pass.style.background = "white";
                ukloniGresku("password");
                return true;
            }
        },
        url:function (urlInput) {
            var regUrl=/^(http[s]?:\/\/(www\.)?|ftp:\/\/(www\.)?|www\.|ssh){1}([0-9a-z-\.=]+)+((\.[a-z]{2,3})+)(\/(.)*)?(\?(.)*)?/;             
            if(!regUrl.test(urlInput)) {
                dodajGresku("url");
                urlInput.style.background = "orangered";
                return false;
             }
             else {
                urlInput.style.background = "white";
                ukloniGresku("url");
                return true;
            }
        }
    } 
    }
    return konstruktor;
    }());
