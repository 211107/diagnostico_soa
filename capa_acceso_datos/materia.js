const connection = require('../config/db');

// Obtener todas las materias desde MySQL
function obtenerTodasLasMaterias(callback) {
    const sql = 'SELECT * FROM materias';
    connection.query(sql, (error, resultados) => {
        if (error) {
            return callback(error);
        }
        return callback(null, resultados);
    });
}

// Obtener las materias de un alumno
function obtenerMateriasDeAlumno(alumnoId, callback) {
    const sql = 'SELECT * FROM materias WHERE alumno_id = ?';
    connection.query(sql, [alumnoId], (error, resultados) => {
        if (error) {
            return callback(error);
        }
        return callback(null, resultados);
    });
}

function crearMateria(nombre, callback) { 
    const sql = 'INSERT INTO materias (nombre) VALUES (?)'; 
    connection.query(sql, [nombre], (error, resultado) => {
        if (error) {
            return callback(error);
        }
        return callback(null, resultado.insertId);
    });
}

// Función para asignar una materia a un alumno
function asignarMateriaAAlumno(materiaId, alumnoId, callback) {
    const sql = 'INSERT INTO Alumnos_Materias (alumno_id, materia_id) VALUES (?, ?)';
    connection.query(sql, [alumnoId, materiaId], (error, resultado) => {
        if (error) {
            return callback(error);
        }
        return callback(null, resultado.insertId);
    });
}

// Función para obtener las materias de un alumno
function obtenerMateriasDeAlumno(alumnoId, callback) {
    const sql = 'SELECT m.* FROM Materias m INNER JOIN Alumnos_Materias am ON m.materia_id = am.materia_id WHERE am.alumno_id = ?';
    connection.query(sql, [alumnoId], (error, materias) => {
        if (error) {
            return callback(error);
        }
        return callback(null, materias);
    });
}


module.exports = {
    obtenerTodasLasMaterias,
    obtenerMateriasDeAlumno,
    crearMateria,
    asignarMateriaAAlumno
};
