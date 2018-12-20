"use strict";
const { getFromDynamo } = require("./lib/dynamo");
const prettyBytes = require("pretty-bytes");

const format = require("date-fns/format");

const outputResult = result => {
  result.forEach(entry => {
    const { timestamp } = entry;

    const ts = format(timestamp, "YYYY-MM-DD hh:mm:ss a");
    console.log(ts);

    entry.data.forEach(item => {
      item.files.forEach(file => {
        const size = prettyBytes(file.filesize, { signed: true });
        console.log(`${file.filename} ${size}`);
      });
    });

    console.log("===========================================");
  });
};

module.exports.chartSize = async (request, response) => {
  const result = await getFromDynamo("cds-snc/bundle-size-tracker");
  outputResult(result);
  console.log("LENGTH", result.length);
  response.status(200).send("Hello World!");
};
