const connection = require('../config/db');

// Obtener todos los alumnos desde MySQL
function obtenerTodosLosAlumnos(callback) {
    const sql = 'SELECT * FROM alumnos';
    connection.query(sql, (error, resultados) => {
        if (error) {
            return callback(error);
        }
        return callback(null, resultados);
    });
}

// Obtener todos los alumnos de un tutor
function obtenerAlumnosDeTutor(tutorId, callback) {
    const sql = 'SELECT * FROM alumnos WHERE tutor_id = ?';
    connection.query(sql, [tutorId], (error, resultados) => {
        if (error) {
            return callback(error);
        }
        return callback(null, resultados);
    });
}

// Crear un nuevo alumno
function crearAlumno(nombre, callback) {
    const sql = 'INSERT INTO alumnos (nombre) VALUES (?)';
    connection.query(sql, [nombre], (error, resultado) => {
        if (error) {
            return callback(error);
        }
        return callback(null, resultado.insertId);
    });
}

// Función para asignar un tutor a un alumno existente
function asignarAlumnoATutor(alumnoId, tutorId, callback) {
    alumnoDAO.obtenerAlumnoPorId(alumnoId, (error, alumno) => {
        if (error) {
            return callback(error);
        }
        if (alumno) {
            alumnoDAO.actualizarTutorDeAlumno(alumnoId, tutorId, (error) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, alumnoId);
            });
        } else {
            return callback(new Error('El alumno no existe'));
        }
    });
}

// Obtener un alumno por su ID
function obtenerAlumnoPorId(alumnoId, callback) {
    const sql = 'SELECT * FROM alumnos WHERE alumno_id = ?';
    connection.query(sql, [alumnoId], (error, resultado) => {
        if (error) {
            return callback(error);
        }
        if (resultado.length === 0) {
            return callback(null, null); 
        }
        return callback(null, resultado[0]);
    });
}

// Actualizar el tutor de un alumno
function actualizarTutorDeAlumno(alumnoId, tutorId, callback) {
    const sql = 'UPDATE alumnos SET tutor_id = ? WHERE alumno_id = ?';
    connection.query(sql, [tutorId, alumnoId], (error, resultado) => {
        if (error) {
            return callback(error);
        }
        return callback(null, resultado);
    });
}

module.exports = {
    obtenerTodosLosAlumnos,
    obtenerAlumnosDeTutor,
    crearAlumno,
    asignarAlumnoATutor,
    obtenerAlumnoPorId,
    actualizarTutorDeAlumno
   
};
