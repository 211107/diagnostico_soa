const tutorDAO = require('../capa_acceso_datos/tutor');
const alumnoDAO = require('../capa_acceso_datos/alumno');
const materiaDAO = require('../capa_acceso_datos/materia');


// Función para obtener todos los tutores
function obtenerTodosLosTutores(callback) {
    tutorDAO.obtenerTodosLosTutores((error, tutores) => {
        if (error) {
            return callback(error);
        }
        return callback(null, tutores);
    });
}

// Función para crear un nuevo tutor
function crearTutor(nombre, callback) {
    tutorDAO.crearTutor(nombre, (error, tutorId) => {
        if (error) {
            return callback(error);
        }
        return callback(null, tutorId);
    });
}

// Función para obtener todos los alumnos
function obtenerTodosLosAlumnos(callback) {
    alumnoDAO.obtenerTodosLosAlumnos((error, alumnos) => {
        if (error) {
            return callback(error);
        }
        return callback(null, alumnos);
    });
}

// Función para obtener todos los alumnos de un tutor
function obtenerAlumnosDeTutor(tutorId, callback) {
    alumnoDAO.obtenerAlumnosDeTutor(tutorId, (error, alumnos) => {
        if (error) {
            return callback(error);
        }
        return callback(null, alumnos);
    });
}

// Función para crear un nuevo alumno
function crearAlumno(nombre, tutorId, callback) {
    alumnoDAO.crearAlumno(nombre, tutorId, (error, alumnoId) => {
        if (error) {
            return callback(error);
        }
        return callback(null, alumnoId);
    });
}

// Función para obtener todas las materias
function obtenerTodasLasMaterias(callback) {
    materiaDAO.obtenerTodasLasMaterias((error, materias) => {
        if (error) {
            return callback(error);
        }
        return callback(null, materias);
    });
}

// Función para obtener las materias de un alumno
function obtenerMateriasDeAlumno(alumnoId, callback) {
    materiaDAO.obtenerMateriasDeAlumno(alumnoId, (error, materias) => {
        if (error) {
            return callback(error);
        }
        return callback(null, materias);
    });
}

// Función para crear una nueva materia
function crearMateria(nombre, alumnoId, callback) {
    materiaDAO.crearMateria(nombre, alumnoId, (error, materiaId) => {
        if (error) {
            return callback(error);
        }
        return callback(null, materiaId);
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


function asignarMateriaAAlumno(materiaId, alumnoId, callback) {
    materiaDAO.asignarMateriaAAlumno(materiaId, alumnoId, (error, resultado) => {
        if (error) {
            return callback(error);
        }
        return callback(null, resultado);
    });
}


module.exports = {
    obtenerTodosLosTutores,
    crearTutor,
    obtenerTodosLosAlumnos,
    obtenerAlumnosDeTutor,
    crearAlumno,
    obtenerTodasLasMaterias,
    obtenerMateriasDeAlumno,
    crearMateria,
    asignarAlumnoATutor,
    asignarMateriaAAlumno
};
