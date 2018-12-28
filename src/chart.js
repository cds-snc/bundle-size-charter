export const chart = (data, options) => {
  return `<!DOCTYPE html>
  <html>
    <head>
      <title>Parcel Sandbox</title>
      <meta charset="UTF-8" />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js"></script>
    </head>
    <body>
      <div
        class="chart-container"
        style="position: relative; height:50vh; width:100vh"
      >
        <canvas id="myChart" width="200" height="200"></canvas>
      </div>
      <script>
        const UNITS = ["B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  
        const toLocaleString = (number, locale) => {
          let result = number;
          if (typeof locale === "string") {
            result = number.toLocaleString(locale);
          } else if (locale === true) {
            result = number.toLocaleString();
          }
  
          return result;
        };
  
        const bytes = (number, options) => {
          if (!Number.isFinite(number)) {
            throw new TypeError(
              "Expected a finite number"
            );
          }
  
          options = Object.assign({}, options);
  
          if (options.signed && number === 0) {
            return " 0 B";
          }
  
          const isNegative = number < 0;
          const prefix = isNegative ? "-" : options.signed ? "+" : "";
  
          if (isNegative) {
            number = -number;
          }
  
          if (number < 1) {
            const numberString = toLocaleString(number, options.locale);
            return prefix + numberString + " B";
          }
  
          const exponent = Math.min(
            Math.floor(Math.log10(number) / 3),
            UNITS.length - 1
          );
          number = Number((number / Math.pow(1000, exponent)).toPrecision(3));
          const numberString = toLocaleString(number, options.locale);
  
          const unit = UNITS[exponent];
  
          return prefix + numberString + " " + unit;
        };
  
        var ctx = document.getElementById("myChart");
  
        const options = {
          legend: { position: "bottom" },
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                var label = data.datasets[tooltipItem.datasetIndex].label || "";
                if (label) {
                  label += ": ";
                }
                label += bytes(Math.round(tooltipItem.yLabel * 100) / 100);
                return label;
              }
            }
          },
          scales: {
            yAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: "File size"
                },
                ticks: {
                  callback: (value, index, values) => {
                    return bytes(value);
                  }
                }
              }
            ]
          }
        };
       
        const obj = {
          type: "line",
          responsive: false,
          data: ${JSON.stringify(data)},
          options
        };
  
        var myChart = new Chart(ctx, obj);
      </script>
    </body>
  </html>`;
};
