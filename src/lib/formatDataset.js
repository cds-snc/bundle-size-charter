const randomHexColor = require("random-hex-color");
const datasets = [];

const setDataObj = (filename, data, index) => {
  let colour = randomHexColor();
  return {
    label: filename,
    borderColor: colour,
    pointBorderColor: colour,
    pointHoverBackgroundColor: colour,
    pointHoverBorderColor: colour,
    pointBackgroundColor: "#fff",
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    fill: false,
    lineTension: 0.1,
    data: data
  };
};

export const formatDataset = result => {
  let labels = [];
  result.forEach(entry => {
    const { sha } = entry;
    labels.push(`View:${sha.substring(0, 6)}`);

    entry.data.forEach(item => {
      item.files.forEach(file => {
        if (!datasets[file.filename]) {
          datasets[file.filename] = {};
          datasets[file.filename].data = [];
        }

        datasets[file.filename].data.push(file.filesize);
      });
    });
  });
  let chartDatasets = [];

  Object.keys(datasets).map(function(key, index) {
    const data = datasets[key].data;

    chartDatasets.push(setDataObj(key, data, index));
  });

  return {
    labels,
    datasets: chartDatasets
  };
};
