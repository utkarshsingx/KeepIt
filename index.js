const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  fs.readdir("./files", (err, files) => {
    res.render("index", { files: files });
  });
});

app.post("/create", function (req, res) {
  fs.writeFile(
    `./files/${req.body.title.split(' ').join('')}.txt`,
    req.body.details,   // this is content of the note given name attribute detail and it is in format of writefile
    function (err) {
      res.redirect("/");
    }
  );
});

app.listen(3000);
