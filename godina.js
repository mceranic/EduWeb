const Sequelize = require("sequelize");
//const connection = require("./db.js");

module.exports = function(connection,DataTypes){
const Godina = connection.define("godina", {
    naziv: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    nazivRepSpi: {
        type: Sequelize.STRING,
        allowNull: false        
    },
    nazivRepVje: {
        type: Sequelize.STRING,
        allowNull: false        
    }
});
return Godina;
};