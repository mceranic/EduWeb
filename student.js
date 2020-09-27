const Sequelize = require("sequelize");
//const connection = require("./db.js");

module.exports = function(connection,DataTypes){
const Student = connection.define("student", {
    imePrezime: {
        type: Sequelize.STRING,
        allowNull: false
    },
    index: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
});
return Student;
};