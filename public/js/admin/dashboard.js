
// Line Chart
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(lineChart);

function lineChart() {
  var data = google.visualization.arrayToDataTable([
    ['Year', 'Sales', 'Expenses'],
    ['2004', 1000, 400],
    ['2005', 1170, 460],
    ['2006', 660, 1120],
    ['2007', 1030, 540],
    ['2007', 1030, 540],

  ]);

  var options = {
    title: 'Company Performance',
    curveType: 'function',
    legend: { position: 'bottom' },
  };

  var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

  function resizeChart() {
    chart.draw(data, options);
  }
  window.addEventListener('resize', resizeChart);
  resizeChart();


}
const baseUrl = 'http://localhost:2000/api/v1';

const accessToken = localStorage.getItem('access-token');

const fetchAllClothesInfo = async () => {
  const response = await fetch(`${baseUrl}/clothes`, {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-type': 'application/json'
    }
  })
  
  const clothesData = await response.json();
  const data = clothesData.data;
  return data;
}

const getTotalSales = async () => {
  const data = await fetchAllClothesInfo();
  
  let sales = 0;
  const today = new Date();

  // start date of the month
  const startOfMonth = new Date(today.getFullYear(), today.getMonth() , 1);
  startOfMonth.setHours(0, 0, 0, 0);

  // start date of the month
  const startOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  console.log(startOfMonth)
  startOfMonth.setHours(0, 0, 0, 0);

  for(let item of data) {
    // if(item.sales) {
    //   sales += item.sales * item.price;
    // }
    const createdAt = new Date(item.updatedAt);

    if(createdAt.getTime() > startOfMonth.getTime() && createdAt.getTime() < startOfNextMonth.getTime()) {
      console.log(item)
    }



  }



}

const logout = () => {
  localStorage.clear();
  window.location.href = `${baseUrl}/admins/login`;
}
getTotalSales();


