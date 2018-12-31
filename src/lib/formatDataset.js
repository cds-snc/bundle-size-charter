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

const getFilenames = result => {
  let filenames = [];
  result.forEach(entry => {
    /* get filenames */
    entry.data.forEach(item => {
      item.files.forEach(file => {
        filenames.push(file.filename);
      });
    });
  });

  // get unique list of filenames
  filenames = Array.from(new Set(filenames));

  return filenames;
};

const initDatasets = filenames => {
  let datasets = {};
  filenames.forEach(file => {
    datasets[file] = {};
    datasets[file].data = [];
  });

  return datasets;
};

const shaFiles = entry => {
  const files = {};
  entry.files.forEach(file => {
    files[file.filename] = file.filesize;
  });

  return files;
};

export const formatDataset = result => {
  let labels = [];
  let filenames = getFilenames(result);
  let datasets = initDatasets(filenames);
  let chartDatasets = [];

  result.forEach(entry => {
    const { sha } = entry;
    labels.push(sha.substring(0, 6));

    entry.data.forEach(entry => {
      const files = shaFiles(entry);
      filenames.forEach(file => {
        let size = 0;
        if (files[file]) size = files[file];
        datasets[file].data.push(size);
      });
    });
  });

  Object.keys(datasets).map(function(key, index) {
    const data = datasets[key].data;
    chartDatasets.push(setDataObj(key, data, index));
  });

  return {
    labels,
    datasets: chartDatasets
  };
};
