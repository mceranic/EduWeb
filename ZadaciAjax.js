var ZadaciAjax = (function () {
    var konstruktor = function (callbackFn) {
        return {
            dajXML: function () {
                var ajax = new XMLHttpRequest();
                ajax.open("GET", 'http://localhost:8080/zadaci', true);
                ajax.onreadystatechange = function () {
                    if (ajax.readyState == 4 && ajax.status == 200)
                        callbackFn(ajax.responseText);
                }
				ajax.setRequestHeader("Accept", "application/xml");
                ajax.send();
            },
            dajCSV: function () {
                var ajax = new XMLHttpRequest();
                ajax.open("GET", 'http://localhost:8080/zadaci', true);
                ajax.onreadystatechange = function () {
                    if (ajax.readyState == 4 && ajax.status == 200)
                         callbackFn(ajax.responseText);
                }
				ajax.setRequestHeader("Accept", "text/csv");
                ajax.send();
            },
            dajJSON: function () {
                var ajax = new XMLHttpRequest();
                ajax.open("GET", '/http://localhost:8080/zadaci', true);
                ajax.onreadystatechange = function () {
                    if (ajax.readyState == 4 && ajax.status == 200)
                         callbackFn(ajax.responseText);
                }
				ajax.setRequestHeader("Accept", " application/json");
                ajax.send();
            }
        }
    }
    return konstruktor;
}());
//module.exports=ZadaciAjax;