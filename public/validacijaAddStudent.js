
document.getElementById("buttonUcitaj").onclick = buttonUcitaj;
document.getElementById("buttonUnesi").onclick = buttonUnesi;

function buttonUnesi() {
    // var mojDiv = document.getElementById("greska");
    // var validacija = new Validacija(mojDiv);
    // var iIp = document.getElementById("ime");
    // var indeks = document.getElementById("index");
    // var temp1 = validacija.ime(iIp);
    // var temp2 = validacija.index(indeks);
    // if(temp1 && temp2) {
    //     mojDiv.innerHTML = "";
    //     alert("Uspjesna radnja!");
    // }

    let godina = SelectOptions[document.getElementById("sGodine").selectedIndex]
    console.log('[SelectedYear] ',godina)
    console.log('[StudentList] ', StudentList)

    sendStudentList({
        godina: godina,
        studenti: StudentList
    }, (msg) => {
        console.log(msg)
        alert(msg); 
        StudentList = [];
    })
}

function ispisi(err, x){
    if (err == null) {

        console.log('Lista studenata:\n'+JSON.stringify(x));
        
        StudentList = x
        
        // nakon sto se ucita lista studenata treba button postaviti aktivnim
        // tj. skloniti mu disabled atribut
        if(x.length !== 0) {
            document.getElementById('buttonUnesi').disabled=false;
        } else {
            document.getElementById('buttonUnesi').disabled=true;
            alert('Lista studenata je 0!')
        }
        
    } else {
        alert('Error: ' + err)
    }
} 

function buttonUcitaj() {

    let key = document.getElementById("key").value
    let secret = document.getElementById("secret").value
    let SeleceYear = SelectOptions[document.getElementById("sGodine").selectedIndex]
    console.log('[Key] ', key)
    console.log('[Secret] ', secret)
    console.log('[SelectedYear] ',SelectOptions[document.getElementById("sGodine").selectedIndex])

    document.getElementById('buttonUnesi').disabled=true;
    var bbucket = new BitBucket(key, secret); 

    bbucket.ucitaj(SeleceYear.nazivRepSpi, SeleceYear.nazivRepVje, ispisi); 
}

function sendStudentList (objToSend, cb) {
    if(objToSend.studenti.length !== 0) {

        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                var rezultat = JSON.parse( ajax.responseText); // godine.json
                console.log(rezultat)
                cb(rezultat.message)
            }
        };
        ajax.open("POST", "http://localhost:8080/student", true);
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send(JSON.stringify(objToSend));
    } else {
        alert('Lista studenata prazna!')
    }
}

