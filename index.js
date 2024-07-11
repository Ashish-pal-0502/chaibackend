require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const Users = require("./database");

// to set templating engine ejs and its path to the index route
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// to parse the data from client side for understanding to express
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  const user = {
    name: req.body.name,
    password: req.body.password,
  };

  await Users.insertMany([user]);
  console.log("user created successfully");

  res.render("home", { user });
});
app.post("/login", async (req, res) => {
  try {
    const user = await Users.findOne({ name: req.body.name });

    if (user.password === req.body.password) {
      res.render("home", { user });
    } else {
      res.send("wrong password");
    }
  } catch {
    res.send("wrong credentials");
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running port 3000`);
});
