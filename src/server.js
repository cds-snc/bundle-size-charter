const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const triggers = require("./index");
app.use(cors());
app.use(bodyParser.json());
app.set("view engine", "pug");

for (let name in triggers) {
  console.info(`Reqistered function ${name}`);

  app.get(`/${name}`, (request, response) => {
    triggers[name](request, response);
  });
}

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, async err => {
  if (err) throw err;
  console.log(`⚡ Ready on http://localhost:${PORT}`);
  console.log("Press Ctrl+C to quit.");
});
