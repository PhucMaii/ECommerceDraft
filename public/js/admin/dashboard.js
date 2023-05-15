
// Line Chart
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(lineChart);

function lineChart() {
  var data = google.visualization.arrayToDataTable([
    ['Year', 'Sales', 'Expenses'],
    ['2004',  1000,      400],
    ['2005',  1170,      460],
    ['2006',  660,       1120],
    ['2007',  1030,      540],
    ['2007',  1030,      540],

  ]);

  var options = {
    title: 'Company Performance',
    curveType: 'function',
    legend: { position: 'bottom' },
  };

  var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

  function resizeChart(){
    chart.draw(data, options);
  }
  window.addEventListener('resize', resizeChart);
  resizeChart();


}