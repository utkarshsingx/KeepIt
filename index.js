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

app.get("/files/:filename", function (req, res) {
  fs.readFile(
    `./files/${req.params.filename}`,
    "utf-8",
    function (err, filedata) {
      res.render("show", { filename: req.params.filename, filedata: filedata });
    }
  );
});

app.get("/edit/:filename", function (req, res) {
  res.render("edit", { filename: req.params.filename });
});

app.post("/edit", function (req, res) {
  const oldPath = path.join(__dirname, "files", req.body.previous);
  const newPath = path.join(__dirname, "files", req.body.new);

  fs.rename(oldPath, newPath, function (err) {
    if (err) {
      console.error("Rename error:", err);
      return res.status(500).send("Rename failed");
    }
    res.redirect("/");
  });
});


app.post("/create", function (req, res) {
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    req.body.details, // this is content of the note given name attribute detail and it is in format of writefile
    function (err) {
      res.redirect("/");
    }
  );
});

app.listen(3000);
