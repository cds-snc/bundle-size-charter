const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const triggers = require("./index");

app.use(bodyParser.json());

for (let name in triggers) {
  console.info(`Reqistered function ${name}`);

  app.post(`/${name}`, (request, response) => {
    triggers[name](request.body, response);
  });
}

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log("Press Ctrl+C to quit.");
});
