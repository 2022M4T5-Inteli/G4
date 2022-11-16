const express = require("express");

// Router Controllers

const router = express.Router();

// controller

// GET requests
router.get("/list", (request, response) => {
  response.send({ message: "hello world! - list" });
});

// POST requests
router.post("/add", (request, response) => {
  response.send({ message: "hello world! - insert" });
});

module.exports = router;