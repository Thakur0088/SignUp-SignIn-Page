const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send("All fields are required.");
  }

  fs.readFile("users.json", "utf8", (err, data) => {
    if (err) return res.status(500).send("Error reading file.");

    const users = JSON.parse(data);

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).send("Email already registered.");
    }

    users.push({ username, email, password });

    fs.writeFile("users.json", JSON.stringify(users, null, 2), (err) => {
      if (err) return res.status(500).send("Error saving user.");
      res.status(201).send("User registered successfully.");
    });
  });
});

app.post("/signin", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Both username and password are required.");
  }

  fs.readFile("users.json", "utf8", (err, data) => {
    if (err) return res.status(500).send("Error reading file.");

    const users = JSON.parse(data);

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
      res.status(200).send(`Welcome back, ${username}!`);
    } else {
      res.status(401).send("Invalid username or password.");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
