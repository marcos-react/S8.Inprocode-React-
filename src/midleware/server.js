import express from "express";
import cors from "cors";
import mysql from "mysql2";
import path from "path";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error("Error to connect to database:", err.message);
  } else {
    console.log("Connect to database");
  }
});

// Route API
app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Error to get users" });
    } else {
      res.json(results);
    }
  });
});

app.post("/users", (req, res) => {
  const { firstname, lastname, email, phone, location, hobby } = req.body;
  const sql =
    "INSERT INTO users (firstname, lastname, email, phone, location, hobby) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [firstname, lastname, email, phone, location, hobby],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: "Error to create users" });
      } else {
        res.status(201).json({ message: "Users created", id: result.insertId });
      }
    }
  );
});

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, email, phone, location, hobby } = req.body;
  const sql =
    "UPDATE users SET firstname = ?, lastname = ?, email = ?, phone = ?, location = ?, hobby = ? WHERE id = ?";
  db.query(
    sql,
    [firstname, lastname, email, phone, location, hobby, id],
    (err) => {
      if (err) {
        res.status(500).json({ error: "Error to update users" });
      } else {
        res.json({ message: "Users updated" });
      }
    }
  );
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM users WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) {
      res.status(500).json({ error: "Error to delete users" });
    } else {
      res.json({ message: "Users deleted" });
    }
  });
});

// Get all locations of cinemas in database
app.get("/cinemas", (req, res) => {
  const sql = "SELECT * FROM cinemas";
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Error to get cinemas" });
    } else {
      res.json(results);
    }
  });
});

// Route to get all events in database
app.get("/events", (req, res) => {
  const sql = "SELECT * FROM events";
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Error to get events" });
    } else {
      res.json(results);
    }
  });
});

app.post("/events", (req, res) => {
  const { title, date } = req.body;
  const sql = "INSERT INTO events (title, date) VALUES (?, ?)";
  db.query(sql, [title, date], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Error to create events" });
    } else {
      res.status(201).json({ message: "Events created", id: result.insertId });
    }
  });
});

// Route to delete an event by ID
app.delete("/events/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM events WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) {
      res.status(500).json({ error: "Error to get an event" });
    } else {
      res.json({ message: "Event deleted" });
    }
  });
});

// Route to get chart in database

app.get("/chart", (req, res) => {
  const sql = "SELECT * FROM chart";
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Error to get details from graphic" });
    } else {
      res.json(results);
    }
  });
});

// Manage other route for react
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// Iniziate the server
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
