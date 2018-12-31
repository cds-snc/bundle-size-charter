const randomHexColor = require("random-hex-color");

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
  const total = result.length;
  let datasets = [];
  let labels = [];
  let chartDatasets = [];

  result.forEach(entry => {
    const { sha } = entry;
    labels.push(sha.substring(0, 6));

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

  Object.keys(datasets).map(function(key, index) {
    const data = datasets[key].data;
    const missing = total - Number(data.length);
    const backFill = new Array(missing).fill(0);
    const backFilled = [...backFill, ...data];
    chartDatasets.push(setDataObj(key, backFilled, index));
  });

  return {
    labels,
    datasets: chartDatasets
  };
};
