import express from "express";
import cors from "cors";
import userService from "./services/user-service.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// Routes
app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  userService.removeUser(id)
                .then((result) => {
                  res.status(204).send(result);
                })
                .catch((error) => {
                  res.status(500).send(error.name);
                });
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userService.addUser(userToAdd)
               .then((result) => {
                   res.status(201).send(result);
               })
               .catch((error) => {
                 res.status(500).send(error.name);
               });
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];
  userService.findUserById(id)
               .then((result) => {
                 if (result) {
                   res.send(result);
                 }
                 else {
                   res.status(404).send(`Not found: ${id})`);
                 }
               })
               .catch((error) => {
                 res.status(500).send(error.name);
               });
});

app.get("/users", (req, res) => {
  const job = req.query.job;
  const name = req.query.name;
  console.log(req);
  console.log(name);
  console.log(job);
  userService.getUsers(name, job)
               .then((result) => {
                 if (result) {
                   res.send(result);
                 }
                 else {
                   res.status(404).send(`Not found: name = ${name}, job = ${job})`);
                 }
               })
               .catch((error) => {
                 res.status(500).send(error.name);
               });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

