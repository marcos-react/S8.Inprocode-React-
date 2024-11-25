import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import path from 'path';


const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión con la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud_app',
    port: 3306,
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos');
    }
});

// Rutas API
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener usuarios' });
        } else {
            res.json(results);
        }
    });
});

app.post('/users', (req, res) => {
    const { firstname, lastname, email, phone, location, hobby } = req.body;
    const sql = 'INSERT INTO users (firstname, lastname, email, phone, location, hobby) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [firstname, lastname, email, phone, location, hobby], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error al crear usuario' });
        } else {
            res.status(201).json({ message: 'Usuario creado', id: result.insertId });
        }
    });
});

app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, email, phone, location, hobby } = req.body;
    const sql = 'UPDATE users SET firstname = ?, lastname = ?, email = ?, phone = ?, location = ?, hobby = ? WHERE id = ?';
    db.query(sql, [firstname, lastname, email, phone, location, hobby, id], (err) => {
        if (err) {
            res.status(500).json({ error: 'Error al actualizar usuario' });
        } else {
            res.json({ message: 'Usuario actualizado' });
        }
    });
});

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [id], (err) => {
        if (err) {
            res.status(500).json({ error: 'Error al eliminar usuario' });
        } else {
            res.json({ message: 'Usuario eliminado' });
        }
    });
});

// Servir archivos estáticos (React Build)
//app.use(express.static(path.join(__dirname, 'client/build')));

// Manejar todas las demás rutas con React (react-router-dom)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
