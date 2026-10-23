const express = require("express");
const app = express();

app.use(express.json());

let users = [];
let nextId = 1;

// CREATE
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "name and email required please fill  it" });
  }
  const user = { id: nextId++, name, email };
  users.push(user);
  res.status(201).json(user);
});

// READ ALL
app.get("/users", (req, res) => {
  res.json(users);
});

// READ ONE
app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

// UPDATE
app.put("/users/:id", (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  user.name = req.body.name ?? user.name;
  user.email = req.body.email ?? user.email;
  res.json(user);
});

// DELETE
app.delete("/users/:id", (req, res) => {
  const index = users.findIndex(u => u.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ message: "User not found" });
  users.splice(index, 1);
  res.json({ message: "User deleted" });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));