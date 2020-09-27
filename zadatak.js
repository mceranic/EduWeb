const Sequelize = require("sequelize");
//const connection = require("./db.js");

module.exports = function(connection,DataTypes){
const Zadatak = connection.define("zadatak", {
    naziv: {
        type: Sequelize.STRING,
        allowNull: false
    },
    postavka: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
return Zadatak;
};