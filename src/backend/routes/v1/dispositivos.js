const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

const express = require("express");

// Router Controllers

const router = express.Router();

// controller

// GET requests
router.get("/list", (request, response) => {
  response.send({ message: "hello world! - list" });
});

// POST requests
router.post("/add", async (request, response) => {
  const dispositivo = await prisma.dispositivo.create({
    data: {
      estufa: "estufa teste",
      mac: "AABBCCDDEEFF",
    },
  });
  response.send({ message: "hello world! - insert" });
});

router.post("/edit", (request, response) => {
  response.send({ message: "hello world! - edit" });
});

module.exports = router;
