"use strict";
import { loadFromFirestore } from "./lib/firestore";
const { formatDataset } = require("./lib/formatDataset");

module.exports.chartSize = async (request, response) => {
  if (!request.query.hasOwnProperty("repo")) {
    return response
      .status(500)
      .send(
        "GET query must include a repo name ex. repo=cds-snc/bundle-size-tracker-demo"
      );
  }
  const branch = request.query.branch || "master";
  const result = await loadFromFirestore(request.query.repo, branch);

  const dataset = formatDataset(result);

  response.render("index", {
    title: "Chart",
    reponame: request.query.repo,
    data: JSON.stringify(dataset)
  });
};
