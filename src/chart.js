//const JSONfn = require("json-fn");

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

      <script type="module">
        import {prettyBytes} from 'https://unpkg.com/cds-pretty-bytes@5.1.0/index.js'; 
        const ctx = document.getElementById("myChart");
        const options = {
          legend: { position: "bottom" },
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                var label = data.datasets[tooltipItem.datasetIndex].label || "";
                if (label) {
                  label += ": ";
                }
                label += prettyBytes(Math.round(tooltipItem.yLabel * 100) / 100);
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
                    return prettyBytes(value);
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
  
        const myChart = new Chart(ctx, obj);
      </script>
    </body>
  </html>`;
};
