const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { DUserData, DUserList, DLoginnedUser } = require("./data/users");
const PORT = process.env.PORT | 3001;

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.post("/login", (req, res) => {
  if (
    req.body.email === DUserData.email &&
    req.body.password === DUserData.password
  ) {
    return res.json({
      token: "qwertyuiopasdfghjklzxcvnm",
      user: DLoginnedUser,
    });
  }
  res.sendStatus(400);
});

app.post("/logout", (_, res) => {
  res.sendStatus(200);
});

app.get("/users", (_, res) => {
  res.json(DUserList);
});

let currentId = 3;

app.post('/users', (req, res) => {
  const newUser = { ...req.body, id: currentId++ };
  DUserList.push(newUser);
  res.status(201).json(newUser);
});

app.put("/users/:id", (req, res) => {
  const updatedUserData = req.body;
  const userIndex = DUserList.findIndex((user) => user.id === req.params.id);

  if (userIndex !== -1) {
    DUserList[userIndex] = { ...DUserList[userIndex], ...updatedUserData };
    res.sendStatus(200)
    res.send(DUserList[userIndex])
  } else {
    res.sendStatus(404)
  }
});

app.listen(PORT, () => {
  console.log(PORT);
});
