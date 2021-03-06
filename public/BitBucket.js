var BitBucket = (function () {
    var token = null;

    var ucitaj = function (nazivRepSpi, nazivRepVje, callback) {
        token.then(token => {
            ucitajStudente(token, nazivRepSpi, nazivRepVje, callback);
        }).catch(e => {
            callback(e.response, null)
        });
    }

    var ucitajStudente = function (t, nazivRepSpi, nazivRepVje, callback) {
        var request = new XMLHttpRequest();
        
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                var response = JSON.parse(request.responseText);
                var studenti = [];

                response.values.forEach(value => {
                    var ime = value.owner.username;
                    var brIndex = value.name.substr(value.name.length - 5);

                    if (!studenti.find(x => x.index === brIndex)){
                        studenti.push({
                            imePrezime: ime,
                            index: brIndex
                        });
                    }
                });

                callback(null, studenti);
            }
            else if (request.readyState == 4){

                // callback(new Error('Greska pri ucitavanju studenata!'), null);
                console.log('Ucitaj ERR', e)
                callback( request.response, null);
            }
        }

        var filter = 'q=name~"' + nazivRepSpi + '" OR name~"' + nazivRepVje + '"';
        request.open('GET', 'https://api.bitbucket.org/2.0/repositories?role=member&' + filter);
        // request.open('GET', 'https://api.bitbucket.org/2.0/repositories/mceranic1?role=member&' + filter);
        request.setRequestHeader("Authorization", 'Bearer ' + t);
        request.send();
    }

    var konstruktor = function (key, secret) {
        if (!key) {
            throw " Key ne moze biti null";
        }
        if(!secret) {
            throw "Secret ne moze biti null";
        }

        token = new Promise(function (resolve, reject) {
            var request = new XMLHttpRequest();

            request.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == 200) {
                    resolve(JSON.parse(request.responseText).access_token);
                }
                else if (request.readyState == 4)
                    reject(request);
            }

            request.open("POST", "https://bitbucket.org/site/oauth2/access_token", true);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.setRequestHeader("Authorization", 'Basic ' + btoa(key + ':' + secret));
            request.send("grant_type=" + encodeURIComponent("client_credentials"));
        });
    };

    konstruktor.prototype = {
        constructor: konstruktor,
        ucitaj: ucitaj
    }

    return konstruktor;
}());
