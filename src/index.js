"use strict";
const { getFromDynamo } = require("./lib/dynamo");
const prettyBytes = require("pretty-bytes");

const format = require("date-fns/format");

const datasets = [];

let colours = ["green", "yellow", "orange", "blue"];

const setDataObj = (filename, data, index) => {
  return {
    label: filename,
    borderColor: colours[index],
    pointBorderColor: colours[index],
    pointHoverBackgroundColor: colours[index],
    pointHoverBorderColor: colours[index],
    pointBackgroundColor: "#fff",
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    fill: false,
    lineTension: 0.1,
    data: data
  };
};

/*

*/

const outputResult = result => {
  let entries = [];

  result.forEach(entry => {
    const { timestamp, sha } = entry;

    const ts = format(timestamp, "YYYY-MM-DD hh:mm:ss a");
    entries.push(sha.substring(0, 6));

    entry.data.forEach(item => {
      item.files.forEach(file => {
        if (!datasets[file.filename]) {
          datasets[file.filename] = {};
          datasets[file.filename].data = [];
        }

        datasets[file.filename].data.push(file.filesize);
        // console.log(`${file.filename} ${file.filesize}`);
      });
    });

    //console.log("===========================================");
    console.log(datasets);
  });

  let chartDatasets = [];

  Object.keys(datasets).map(function(key, index) {
    const data = datasets[key].data;
    chartDatasets.push(setDataObj(key, data, index));
  });

  //
  console.log(chartDatasets);
  //
};

module.exports.chartSize = async (request, response) => {
  const result = await getFromDynamo("cds-snc/bundle-size-tracker");
  outputResult(result);
  response.status(200).send("Hello World!");
};
