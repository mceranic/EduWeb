const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const url = require('url');
const path = require('path');
var multer  = require('multer');
const XML = require('xml-library');
const XMLNode = XML.XMLNode;  // klasa
const app = express();

//baza
const dataBase = require('./db.js');
dataBase.connection.sync({
	force:false
}).then(function(){});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "pug");

// Zadatak 1 - radi!!!
app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res){
	console.log('Dobavljeni svi fajlovi');
	res.sendFile(path.resolve('public/')); 
});

// Zadatak 2
app.get('/addZadatak', function(req, res) {
	console.log('Ucitan fajl addZadatak');
	res.sendFile(__dirname + '/public/addZadatak.html');
});
// postavljamo storage engine
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + '/zadaci')
    },
    filename: (req, file, cb) => {
      cb(null, req.body.naziv + path.extname(file.originalname));
    }
});
// unutar upload raditi provjeru
var upload = multer({storage: storage,
	fileFilter: (req, file, cb) => {
		var dozvoljenaEkstenzija = /(.*\.pdf)$/;
		let ulazniFajl = String(file.originalname);

		if(!req.body.naziv) {
			return cb('Popunite prazna polja!');
		}

		if(!ulazniFajl.match(dozvoljenaEkstenzija)) {
			return cb('Tip fajla nije ispravan!');
		}

		fs.readFile('provjeraImena.txt', (err, data) => {
			if(err) throw err;

			if(data.includes(req.body.naziv))
				return cb('Zadatak postoji!');
			else cb(null, true);
		});

	}}).single('postavka');

app.post('/addZadatak', upload, function(req,res){
	// kreirati json fajl u koji ubacujemo naziv i postavku
	let podaci = JSON.stringify({
		"naziv" : String(req.body.naziv),
		"postavka" : String(['/zadaci/', req.body.naziv, '.pdf'].join(''))
	});
	
	fs.appendFile(__dirname + "/json/" + req.body.naziv + "Zad.json", podaci, function(error, data) {
		if(error) {
			res.send("Greska prilikom ucitavanja!");
		}		
		console.log("dodan json fajl");
		let novaLinija = req.body.naziv + require('os').EOL; // radi provjere istog imena zadatka
		fs.appendFile('provjeraImena.txt', novaLinija, function(err){
			if(err) {
				res.send("Greska prilikom ucitavanja!");
			}
			res.send(podaci);
			console.log('Uspjesno dodan naziv!');
		});
	});
	var zadaci = [];
	fs.readdir(__dirname + '/json/', function (err, data) {
		if (err) 
			res.send("Greska prilikom ucitavanja!");        
        //citamo svaki i upisujemo JSON fajlove u niz
        for (var i = 0; i < data.length; i++) {
				zadaci.push(data[i]);  // ubacuje nazive fajlova
		}
		var rezultat; // formira json fajl
		var pomocni = [];
		for(var i = 0; i < zadaci.length; i++) {
			rezultat = fs.readFileSync(__dirname + '/json/' + zadaci[i], 'utf8');
            pomocni.push(JSON.parse(rezultat));
		}
				fs.writeFile(__dirname + '/zadaci.json', JSON.stringify(pomocni), function(error) {
					if (error) 
						res.send("Greska prilikom ucitavanja!"); 
				});			
	});
	// provjeriti prvo da li se nalazi u bazi
	dataBase.zadatak.findOne({
		where: {
			naziv: String(req.body.naziv)
		}}).then(zad => {
				if(!zad) {
					dataBase.zadatak.create({
						naziv: String(req.body.naziv), 
						postavka: 'localhost:8080/zadatak?naziv='+ encodeURIComponent(req.body.naziv)
						})
						.catch(function(err){});
						console.log("Dodan zadatak!");
				}
				else {
					res.send('Zadatak već postoji!');
				}			
	  });
});

// zadatak3 
app.get('/zadatak',function(req,res) {
	//var file = __dirname + '/zadaci/' + String(req.query.naziv) + '.pdf';
	//var naziv = url.parse(req.url, true).query.naziv;
	dataBase.zadatak.findOne({
		where: {
			naziv: String(req.query.naziv)
		}}).then(zad => {
				if(!zad) {
					res.send('Zadatak ne postoji!');
				}
				else {
					// vrati zadatak sa postavkom
					var file = __dirname + '/zadaci/' + String(req.query.naziv) + '.pdf';
					res.contentType("application/pdf");
					res.sendFile(file);
				}			
	  });
});

// Zadatak 4
app.get('/addGodina', function(req, res) {
	console.log('Ucitan fajl addGodina');
	res.sendFile(__dirname + '/public/addGodina.html');
});

app.post('/addGodina',function (req, res){   
	if(!req.body.nazivGod || !req.body.nazivRepSpi || !req.body.nazivRepVje) {
		res.send("Popunite prazna polja");
	}
	// provjeriti prvo da li se nalazi u bazi
	dataBase.godina.findOne({
		where: {
			naziv: String(req.body.nazivGod)}}
			).then(god => {
				if(!god) {
					dataBase.godina.create({
						naziv: String(req.body.nazivGod), 
						nazivRepSpi: String(req.body.nazivRepSpi),
						nazivRepVje: String(req.body.nazivRepVje)})
						.spread(() => {
							res.send({
								message: `Godina Dodana!`
							});
						})
						.catch(function(err){});
				}
				else {
					res.send('Godina već postoji!');
				}			
	  });	 
});

// zadatak 5
app.get('/godine', function(req,res) {
		// citamo godina tabelu
		// formiramo json format
			
		dataBase.godina.findAll().then(godine => {   
			// godine - niz svih instanci godina
			let ispis = [];
            for(var i = 0; i < godine.length; i++){
				let obj = {
					nazivGod: String(godine[i].naziv),
					nazivRepVje: String(godine[i].nazivRepVje),
					nazivRepSpi: String(godine[i].nazivRepSpi)
				};
				ispis.push(obj);
			   }
			   fs.writeFile('godine.json', JSON.stringify(ispis), function(error) {
				if (error) 
				  res.send(error);
			});
			res.writeHead(200,{ 'Content-Type': 'application/json' });
            res.end(JSON.stringify(ispis));
		  });	
});

app.get('/vjezbe', function(req,res) {
		
	dataBase.vjezba.findAll().then(vjezbe => {   
		let ispis = [];
		for(var i = 0; i < vjezbe.length; i++){
			let obj = {
				naziv: String(vjezbe[i].naziv),
				spirala: Boolean(vjezbe[i].spirala)
			};
			ispis.push(obj);
		   }
		   fs.writeFile('vjezbe.json', JSON.stringify(ispis), function(error) {
			if (error) 
			  res.send(error);
		});
		res.writeHead(200,{ 'Content-Type': 'application/json' });
		res.end(JSON.stringify(ispis));
	  });	
});

// Zadatak 7
app.get('/zadaci', function (req, res) {
	var header = req.headers.accept.split(',');    // provjerit 
	
    if (header.includes('application/json')) {  // okej
		fs.readFile(__dirname + '/zadaci.json', function (error,data){
			res.contentType("application/json");
			res.send(data);
			});
		console.log("json");	
    }
    else {
		if (header.includes('application/xml') || header.includes('text/xml')) {
			var dokument = fs.readFileSync(__dirname + '/zadaci.json', 'utf8');
			var pomocniString = JSON.parse(dokument);  // prebacuje u js objekat [{...}, {...}] 
			var xml = new XMLNode("zadaci");
			for(var i = 0; i < pomocniString.length; i++) {
				var xml_zadatak = new XMLNode("zadatak");
				var xml_naziv = new XMLNode("naziv", pomocniString[i].naziv.toString());
				var xml_postavka = new XMLNode("postavka", pomocniString[i].postavka.toString());
				xml_zadatak.addChild(xml_naziv);
				xml_zadatak.addChild(xml_postavka);
				xml.addChild(xml_zadatak);
			}
			xml.asXMLString(function(err, data) {
				if(err) {
					console.log("Greska pri ispisu!");
				}
				res.contentType('application/xml');
				res.send(data);
			});
			console.log("xml");
		}
		//if(header.includes('text/csv'))
        else {
			var dokument = fs.readFileSync(__dirname + '/zadaci.json', 'utf8');
			var pomocniString = JSON.parse(dokument);  // prebacuje u js objekat [{...}, {...}] 
			var rezultat = '';
			for(var i = 0; i < pomocniString.length; i++) {
				rezultat += pomocniString[i].naziv.toString() + ',' + pomocniString[i].postavka.toString();
				if(i < pomocniString.length - 1) {
					rezultat += '\r\n';
				}
			}
			console.log("csv");
            res.contentType('text/csv');
			res.send(rezultat);
        }
	} 
});

app.get('/dohvatiZadatke', function (req, res) {
	dataBase.zadatak.findAll().then(zadaci => {   
		// godine - niz svih instanci godina
		let ispis = [];
		for(var i = 0; i < zadaci.length; i++){
			let obj = {
				naziv: String(zadaci[i].naziv),
				postavka: String(zadaci[i].postavka)
			};
			ispis.push(obj);
		   }
		res.writeHead(200,{ 'Content-Type': 'application/json' });
		res.end(JSON.stringify(ispis));
	  });
});

// zadatak 2a
app.get('/addVjezba', function(req, res) {
	console.log('Ucitan fajl addVjezba');
	res.sendFile(__dirname + '/public/addVjezba.html');
});

app.post('/addVjezba',function (req, res){   
	// naci ovu godinu i vjezbu i dodati veze u tabelu 
		if(!req.body.sVjezbe) { // undefined
			if(!req.body.naziv_vjezbe) {
				res.send("popunite prazna polja");
			}
			console.log('Kreiranje vjezbe (ako ne postoji)');
			// provjerimo prvo da li postoji
			dataBase.vjezba.findOne({
				where: {
					naziv: String(req.body.naziv_vjezbe)
				}}).then(vje => {
						if(!vje) {
							dataBase.vjezba.create({
								naziv: String(req.body.naziv_vjezbe), 
								spirala: req.body.spirala && req.body.spirala === 'on' ? true : false
								}).then(function(v) {
									dataBase.godina.findOne({
										where: {
											naziv: req.body['sGodine']
										}}).then(god => {
											v.setGodine(god);
											return new Promise(function(resolve,reject){resolve(v);});			
									  });								
								})
								.catch(function(err){});
						}
						else {
							res.send('Greska: Vježba već postoji!');
						}			
			  });
		}
		else {
			console.log('fpostojeca');
			dataBase.godina.findOne({
				where: {
					naziv: req.body['sGodine']
				}}).then(god => {
					dataBase.vjezba.findOne({
						where: {
							naziv: req.body['sVjezbe']
						}}).then(vje => {
							vje.addGodine(god);	
							return new Promise(function(resolve,reject){
								resolve(vje);
							});		
					  });			
			  });   
		}				
		  res.sendFile(__dirname + '/public/addVjezba.html');	  
	});
	
	app.post('/vjezba/:idVjezbe/Zadatak', function(req, res){
	   dataBase.vjezba.findByPk(req.param.idVjezbe).then(vj => {
			vj.getZadaci().then(zadaci => {
				if (!zadaci.find(zad => zad.dataValues.id == req.param.idVjezbe)) {
					vj.addZadaci(req.body.naziv).then(() => {
						res.sendFile(__dirname, '/public/addVjezba.html');
					});
				} else {
					res.sendFile(__dirname, '/public/addVjezba.html');
				}
			});
		});
	});
	
	app.get('/addStudent', function(req, res) {
		console.log('Ucitan fajl addStudent');
		res.sendFile(__dirname + '/public/addStudent.html');
	});
	app.post('/student', function(req, res){
		try {
			if (req.body){
				dataBase.godina.findByPk(req.body.godina.id)
				.then(g => {
					let studenti = req.body.studenti;
					let m = studenti.length;
					let n = 0;
	
					let studentiGod = [];
	
					Promise.all(studenti.map(async s => {
						await dataBase.student.findOrCreate({
							where: { index: s.index },
							defaults: s
						})
						.spread((user, created) => {
							if (created) n = n+1;
							studentiGod.push(user);
						});                    
					})
					).then(() => {
						g.setStudenti(studentiGod);
						g.save();
	
						res.send({
							message: `Dodano je ${n} novih studenata i upisano ${m} na godinu ${g.dataValues.naziv}`
						});
					});
				})
				.catch(e => {
					res.status(500).send({
						message: e.message
					});
				});
			}
		}
		catch(err) {
			res.status(500).send({
				message: err.message
			});
		}
	});

const port = 8080;
app.listen(port, () => console.log(`Server radi na portu ${port}`));
