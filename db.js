const Sequelize = require("sequelize");
const connection = new Sequelize("wt2018","root","root",{
    host:"localhost",
    dialect:"mysql",
    logging:false
});

const dataBase = {};
dataBase.Sequelize = Sequelize;
dataBase.connection = connection;

// definisemo modele
dataBase.student = connection.import(__dirname + '/student.js');
dataBase.godina = connection.import(__dirname + '/godina.js');
dataBase.zadatak = connection.import(__dirname + '/zadatak.js');
dataBase.vjezba = connection.import(__dirname + '/vjezba.js');

// veze
// 1:n
dataBase.godina.hasMany(dataBase.student, {as:'studenti', foreignKey: 'studentGod'});

// n:m
dataBase.godina.belongsToMany(dataBase.vjezba, {as: 'vjezbe', through: 'godina_vjezba', foreignKey: 'idgodina'});
dataBase.vjezba.belongsToMany(dataBase.godina, {as: 'godine', through: 'godina_vjezba', foreignKey: 'idvjezba'});

dataBase.vjezba.belongsToMany(dataBase.zadatak, {as: 'zadaci', through: 'vjezba_zadatak', foreignKey: 'idvjezba'});
dataBase.zadatak.belongsToMany(dataBase.vjezba, {as: 'vjezbe', through: 'vjezba_zadatak', foreignKey: 'idzadatak'});

module.exports = dataBase;