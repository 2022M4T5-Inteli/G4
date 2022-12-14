const express = require("express");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Server configuration
const cors = require("cors");
const app = express();

const HOSTNAME = "0.0.0.0";
const PORT = 3000;

// routers import

const medidasRoute = require("./routes/v1/medidas");
const dispositivosRoute = require("./routes/v1/dispositivos");
const notificacaoRoute = require("./routes/v1/notificacao");
const healthRoute = require("./routes/v1/health");

// application middleware

app.use(cors());
app.use(express.json());

// application paths

app.use("/medidas", urlencodedParser, medidasRoute);
app.use("/dispositivos", urlencodedParser, dispositivosRoute);
app.use("/notificacao", urlencodedParser, notificacaoRoute);
app.use("/health", urlencodedParser, healthRoute);

// Server Application
app.listen(PORT, HOSTNAME, () => {
  console.log(`Server running on http://${HOSTNAME}:${PORT}`);
});
