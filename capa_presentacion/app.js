const express = require('express');
const bodyParser = require('body-parser');
const servicios = require('../capa_logica_negocio/servicio');


const app = express();

app.use(bodyParser.json());


// Endpoint para obtener todos los tutores
app.get('/tutores', (req, res) => {
    servicios.obtenerTodosLosTutores((error, tutores) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener los tutores' });
        }
        res.json(tutores);
    });
});

// Endpoint para obtener las materias de un alumno
app.get('/alumnos/:alumnoId/materias', (req, res) => {
    const alumnoId = req.params.alumnoId;

    servicios.obtenerMateriasDeAlumno(alumnoId, (error, materias) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener las materias del alumno' });
        }
        const nombresMaterias = materias.map(materia => materia.nombre);

        res.json(nombresMaterias);
    });
});

// Endpoint para obtener todos los alumnos de un tutor
app.get('/tutores/:tutorId/alumnos', (req, res) => {
    const tutorId = req.params.tutorId;
    servicios.obtenerAlumnosDeTutor(tutorId, (error, alumnos) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener los alumnos del tutor' });
        }

        const nombresAlumnos = alumnos.map(alumno => alumno.nombre);

        res.json(nombresAlumnos);
    });
});


// Endpoint para obtener todos los alumnos de un tutor
app.get('/tutores/:tutorId/alumnos', (req, res) => {
    const tutorId = req.params.tutorId;

    servicios.obtenerAlumnosDeTutor(tutorId, (error, alumnos) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener los alumnos del tutor' });
        }
        res.json(alumnos);
    });
});

// Endpoint para crear un nuevo alumno
app.post('/alumnos', (req, res) => {
    const { nombre } = req.body;

    if (!nombre) {
        return res.status(400).json({ error: 'Se requiere un nombre para crear un alumno' });
    }
    servicios.crearAlumno(nombre, (error, alumnoId) => {
        if (error) {
            return res.status(500).json({ error: 'Error al crear el alumno' });
        }
        res.status(201).json({ message: 'Alumno creado exitosamente', alumnoId });
    });
});



// Endpoint para crear un nuevo tutor
app.post('/tutores', (req, res) => {
    const { nombre } = req.body;
    if (!nombre) {
        return res.status(400).json({ error: 'Se requiere un nombre para el tutor' });
    }

    servicios.crearTutor(nombre, (error, tutorId) => {
        if (error) {
            return res.status(500).json({ error: 'Error al crear el tutor' });
        }
        res.json({ message: 'Tutor creado exitosamente', tutorId });
    });
});

// Endpoint para asignar un tutor a un alumno existente
app.post('/tutores/:tutorId/alumnos/:alumnoId', (req, res) => {
    const { tutorId, alumnoId } = req.params;

    servicios.asignarAlumnoATutor(alumnoId, tutorId, (error, alumnoId) => {
        if (error) {
            if (error.message === 'El alumno no existe') {
                return res.status(404).json({ error: 'El alumno no existe' });
            }
            return res.status(500).json({ error: 'Error al asignar el tutor al alumno' });
        }
        res.status(200).json({ message: 'Tutor asignado exitosamente al alumno', alumnoId });
    });
});


// Endpoint para asignar una materia a un alumno
app.post('/alumnos/:alumnoId/materias', (req, res) => {
    const { materiaId } = req.body;
    const { alumnoId } = req.params;

    if (!materiaId || !alumnoId) {
        return res.status(400).json({ error: 'Se requiere un ID de materia y un ID de alumno para asignar una materia' });
    }

    servicios.asignarMateriaAAlumno(materiaId, alumnoId, (error, resultado) => {
        if (error) {
            return res.status(500).json({ error: 'Error al asignar la materia al alumno' });
        }
        res.status(201).json({ message: 'Materia asignada exitosamente al alumno', resultado });
    });
});

// Endpoint para obtener todos los alumnos
app.get('/alumnos', (req, res) => {
    servicios.obtenerTodosLosAlumnos((error, alumnos) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener los alumnos' });
        }
        res.json(alumnos);
    });
});


// Endpoint para crear una materia
app.post('/materias', (req, res) => {
    const { nombre } = req.body; 
    if (!nombre) {
        return res.status(400).json({ error: 'Se requiere un nombre para una materia' });
    }

    servicios.crearMateria(nombre, (error, materiaId) => {
        if (error) {
            return res.status(500).json({ error: 'Error al crear una materia' });
        }
        res.json({ message: 'Materia creada exitosamente', materiaId });
    });
});





// Puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});