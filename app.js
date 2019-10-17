const Sass = require("./sass");
const config = require("./config.json");
const path = require("path");

for (let conf of config.sass) {
  new Sass(conf);
}

const express = require("express");
const app = express();
app.use(express.static("www"));
app.listen(3000, () => console.log("PORT 3000"));

app.all("*", (req, res) =>
  res.sendFile(path.join(__dirname, "www", "index.html"))
);
