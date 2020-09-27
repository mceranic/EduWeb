const Sequelize = require("sequelize");
//const connection = require("./db.js");

module.exports = function(connection,DataTypes){
const Vjezba = connection.define("vjezba", {
    naziv: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    spirala: {
        type: Sequelize.BOOLEAN,
        allowNull: false        
    }
});
return Vjezba;
};