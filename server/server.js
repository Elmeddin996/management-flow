const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userData = require("./data/user");
const PORT = process.env.PORT | 3001;
const bcrypt = require("bcrypt")
const multerConfig = require("./config/multerConfig")
const mongoose = require("mongoose");

const dbURL =
  "mongodb+srv://elmaddinshm:code123@cluster0.p8sczyl.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(dbURL).then(() => {
  app.listen(PORT, () => {
    console.log(PORT);
  });
});
const app = express();


app.use(bodyParser.json());

app.use(cors());

app.post("/signup", (req, res) => {
  const admin = new userData.adminSchema(req.body);
  admin
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});


app.post("/login", async (req, res) => {

  const { email, password} = req.body;
    
    const user = await userData.adminSchema.findOne({ email });
  const auth = await bcrypt.compare(password, user.password)

  if (
    req.body.email === user.email &&
    auth
  ) {
    const token = user.createToken()
    return res.json({
      token: token,
      userId: user._id
    });
  }
    res.sendStatus(400);
});

app.post("/logout", (_, res) => {
  res.sendStatus(200);
});

app.get("/users",  (_, res) => {
  userData.userList.find().then((result) => {
    res.json(result);
  });
});

app.delete("/users/:id", (req, res) => {
  userData.userList
    .findByIdAndRemove(req.params.id)
    .then((deletedUser) => {
      if (!deletedUser) {
        res.send("user id is not correct");
      }
      return;
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/adduser", multerConfig.single("image"), (req, res) => {
  const user = new userData.userList(req.body);

  user
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.put("/users/:id", (req, res) => {
  userData.userList
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404);
      }
      res.send(updatedUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
    });
});

