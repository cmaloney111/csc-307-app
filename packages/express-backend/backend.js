import express from "express";

const app = express();
const port = 8000;

app.use(express.json());

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

// Helper functions
const findUserByNameAndJob = (name, job) => {
  if (name != undefined && job != undefined) {
    return users["users_list"].filter(
      (user) => user["name"] === name && user["job"] === job
    );
  }
  else if (name != undefined) {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
  }
  else if (job != undefined) {
    return users["users_list"].filter(
      (user) => user["job"] === job
    );
  }
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);
  
const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

const removeUser = (id) => {
  let index_by_id = users["users_list"].indexOf(findUserById(id));
  if (index_by_id > -1) {
    users["users_list"].splice(index_by_id, 1);
    return 200;
  }
  else {
    return 400;
  }
}

// Routes
app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  let statusCode = removeUser(id);
  res.sendStatus(statusCode);
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.get("/users", (req, res) => {
  const job = req.query.job;
  const name = req.query.name;
  if (name != undefined || job != undefined) {
    let result = findUserByNameAndJob(name, job);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

