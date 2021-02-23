const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const aboutContent =
  "About Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const contactContent =
  "Contact Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let AllPosts = [];

app.get("/", (req, res) => {
  res.render("home.ejs", {
    pDefault: homeStartingContent,
    hDefault: "Home",
    allPosts: AllPosts,
  });
});
app.get("/about", (req, res) => {
  res.render("about.ejs", { pDefault: aboutContent, hDefault: "About" });
});
app.get("/contact", (req, res) => {
  res.render("contact.ejs", { pDefault: contactContent, hDefault: "Contact" });
});
app.get("/compose", (req, res) => {
  res.render("compose.ejs", { hDefault: "Compose" });
});

app.post("/compose", (req, res) => {
  const Posts = {
    title: req.body.postTitle,
    post: req.body.post,
  };

  AllPosts.push(Posts);
  res.redirect("/");
});
app.get(`/posts/:postName`, (req, res) => {
  let urlToCheck = req.params.postName;
  AllPosts.forEach((posts) => {
    _.lowerCase(posts.title) === _.lowerCase(urlToCheck)
      ? console.log("Match found!!")
      : console.log("Not Found!!");
  });
});
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
