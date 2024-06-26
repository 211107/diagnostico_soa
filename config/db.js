const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos');


  const createTableTutores = `CREATE TABLE IF NOT EXISTS tutores (
    tutor_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
  )`;

  const createTableAlumnos = `CREATE TABLE IF NOT EXISTS alumnos (
    alumno_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    tutor_id INT,
    FOREIGN KEY (tutor_id) REFERENCES tutores(tutor_id)
  )`;

  const createTableMaterias = `CREATE TABLE IF NOT EXISTS materias (
    materia_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    alumno_id INT,
    FOREIGN KEY (alumno_id) REFERENCES alumnos(alumno_id)
  )`;

  const createTableAlumnosMaterias = `CREATE TABLE IF NOT EXISTS alumnos_materias (
    alumno_id INT,
    materia_id INT,
    FOREIGN KEY (alumno_id) REFERENCES alumnos(alumno_id),
    FOREIGN KEY (materia_id) REFERENCES materias(materia_id),
    PRIMARY KEY (alumno_id, materia_id)
  )`;


  connection.query(createTableTutores, (error, results, fields) => {
    if (error) {
      console.error('Error al crear la tabla Tutores:', error);
      return;
    }
    console.log('Tabla Tutores creada exitosamente');
  });

  connection.query(createTableAlumnos, (error, results, fields) => {
    if (error) {
      console.error('Error al crear la tabla Alumnos:', error);
      return;
    }
    console.log('Tabla Alumnos creada exitosamente');
  });

  connection.query(createTableMaterias, (error, results, fields) => {
    if (error) {
      console.error('Error al crear la tabla Materias:', error);
      return;
    }
    console.log('Tabla Materias creada exitosamente');
  });

  connection.query(createTableAlumnosMaterias, (error, results, fields) => {
    if (error) {
      console.error('Error al crear la tabla Alumnos_Materias:', error);
      return;
    }
    console.log('Tabla Alumnos_Materias creada exitosamente');
  });
});

module.exports = connection;
