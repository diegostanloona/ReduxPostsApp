const express = require("express");
const HttpError = require("./models/http-error");
const fetch = require("node-fetch");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.get("/", (req, res, next) => {
  res.json({ test: "test" });
});

app.get("/posts", async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  let posts;

  try {
    const response = await fetch("http://jsonplaceholder.typicode.com/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    posts = await response.json();
  } catch (e) {
    console.log(e);
    const error = new HttpError("Something went wrong.", 500);
    return next(error);
  }

  if (!posts) {
    return next(new HttpError("No posts have been found.", 404));
  }

  res.json({
    posts: posts.map((post) => {
      return { ...post, likes: Math.floor(Math.random() * (100 - 5 + 1) + 5) };
    }),
  }); //Adds a random number of likes for each post
});

app.use((req, res, next) => {
  return next(new HttpError("Could not find this route.", 404));
});

app.use((err, req, res, next) => {
  console.log("TEST");
  res.status(err.code || 500).json({ message: err.message || "Error." });
});

const server = app.listen(process.env.PORT || 5000);
console.log("Listening on port " + (process.env.PORT || 5000));
