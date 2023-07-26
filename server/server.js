const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { DUserData } = require("./data/users");
const PORT = process.env.PORT | 3001;

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.post("/login", (req, res) => {
  if (
    req.body.email === DUserData.email &&
    req.body.password === DUserData.password
  ) {
    return res.json({ token: "qwertyuiopasdfghjklzxcvnm" });
  }
  res.sendStatus(400);
});

app.get("/users",(_,res)=>{
    res.json(DUserData)
})

app.listen(PORT, () => {
  console.log(PORT);
});
