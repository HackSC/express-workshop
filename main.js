const express = require("express");
const app = express();
const port = 3000;

let todos = [];

app.use(express.json());

app.get("/todos", (req, res) => {
  res.send(todos);
});

app.post("/todos", (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const id = todos.length;
  todos.push({ name, description, id });
  res.send("CREATED");
});

app.put("/todos/:id", (req, res) => {
  const id = Number.parseInt(req.params.id);
  const name = req.body.name;
  const description = req.body.description;
  let newTodos;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      if (name) {
        todos[i].name = name;
      }
      if (description) {
        todos[i].description = description;
      }
      newTodos = todos[i];
      break;
    }
  }
  res.send(newTodos);
});

app.delete("/todos/:id", (req, res) => {
  const id = Number.parseInt(req.params.id);
  todos = todos.filter((item) => item.id !== id);
  res.send(todos);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
