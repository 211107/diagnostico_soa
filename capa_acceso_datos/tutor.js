const connection = require('../config/db');

// Obtener todos los tutores desde MySQL
function obtenerTodosLosTutores(callback) {
    const sql = 'SELECT * FROM tutores';
    connection.query(sql, (error, resultados) => {
        if (error) {
            return callback(error);
        }
        return callback(null, resultados);
    });
}

// Crear un nuevo tutor
function crearTutor(nombre, callback) {
    const sql = 'INSERT INTO tutores (nombre) VALUES (?)';
    connection.query(sql, [nombre], (error, resultado) => {
        if (error) {
            return callback(error);
        }
        return callback(null, resultado.insertId);
    });
}


module.exports = {
    obtenerTodosLosTutores,
    crearTutor
   
};
