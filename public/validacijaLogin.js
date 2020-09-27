function buttonLogin() {
    var mojDiv = document.getElementById("greska");
    var validacija = new Validacija(mojDiv);
    var username = document.getElementById("ime");
    var sifra = document.getElementById("password");
    var temp1 = validacija.ime(username);
    var temp2 = validacija.password(sifra);
    if(temp1 && temp2) {
        mojDiv.innerHTML = "";
        alert("Uspjesna radnja!");
    }
}
/* window.onload = function() {	

    document.getElementById("submitLogin").onclick=validacijaPassword;
    var mojDiv = document.getElementById("greska");
    var validacija = new Validacija(mojDiv);
} */

/* function validacijaPassword() {
    var lozinka=document.getElementById("password");
    var regPass=/^(([A-Za-z(0-9)*]+){8,})|(([A-Z0-9(a-z)*]+){8,})|(([a-z0-9(A-Z)*]+){8,})$/;
    if(lozinka.value.match(regPass)) {
        document.getElementById("greska").innerHTML = "";
		return true;
    }
    else{
        porukaGreske += "password";
		document.getElementById("greska").innerHTML = porukaGreske;
		return false;
	} 
} */

/* var Validacija=(function(){
    //lokalne variable idu ovdje
    var porukaGreske = "Sljedeća polja nisu validna:";
    var konstruktor=function(divElementPoruke){
    var Password = function() 
    {
        var regPass=/^(([A-Za-z(0-9)*]+){8,})|(([A-Z0-9(a-z)*]+){8,})|(([a-z0-9(A-Z)*]+){8,})$/;
        if(!regPass.test(pass)) {
            porukaGreske += "password,";
            return false;
        }
        return true; 
    }
    return{
       password: Password
    }
}
    return konstruktor;
}()); */
/* function validacijaLogin(){
	validacijaPassword();
if (!validacijaPassword()) {    
	//document.getElementById("greska").innerHTML=porukaGreske;
	return false;
  }
  else {
	  document.getElementById("greska").innerHTML="";
	  alert("Uspješno ste se prijavili!")
     return true;
  }
} */
/* function validirajPassword() {
    if( !Validacija.password(x) ) {
        document.getElementById("greska").innerHTML=porukaGreske;
    } else {
        document.getElementById("greska").innerHTML="";
    }
} */