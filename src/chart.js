export const chart = data => {
  return `<!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Chart</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js" integrity="sha384-WJu6cbQvbPRsw+66L1nOomDAZzhTALnUlpchFlWHimhJ9o95CMue7xEZXXDRKV2S" crossorigin="anonymous"></script>
  </head>
  <body>
    <div class="chart-container" style="position: relative; height:50vh; width:100vh">
      <canvas id="myChart" width="200" height="200"></canvas>
    </div>
    <script>
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
      type: 'line',
      responsive: false,
      data: ${data}
    });
    </script>
  </body>
  </html>`;
};
