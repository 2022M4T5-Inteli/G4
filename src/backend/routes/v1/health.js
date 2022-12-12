const express = require("express");
const router = express.Router();

// requesição GET  para health check
router.get("/check", async (request, response) => {
  response.statusCode = 200;
  response.send({ success: true, message: "Healthy as ever!" });
});
module.exports = router;
