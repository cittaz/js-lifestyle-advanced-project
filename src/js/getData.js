// export default function printMe() {
//   console.log('I get called from print.js!');
// }
import Chart from 'chart.js/auto';
Chart.defaults.color = "#fff";
Chart.defaults.font.size = 16;

function formatInput() {
  let inputForm = document.getElementById('inputForm');
  let lowerCaseValue = inputForm.value.toLowerCase();
  if(lowerCaseValue.includes(' ')) {
    let finalValue = lowerCaseValue.replace(' ', '-');
    return new URL(`https://api.teleport.org/api/urban_areas/slug:${finalValue}/scores/`);
  }
  else {
    return new URL(`https://api.teleport.org/api/urban_areas/slug:${lowerCaseValue}/scores/`)
  }
}

function createChart(apiResponse) {
  let canvasContainer = document.querySelector('.chart');
  canvasContainer.innerHTML = '<canvas id="myChart"></canvas>';
  let xValues = [];
  let yValues = [];
  let barColors = [];

  for(let i = 0; i<17; i++) {
    let categoryName = apiResponse.categories[i].name;
    let categoryScore = apiResponse.categories[i].score_out_of_10.toFixed(1);
    let categoryColor = apiResponse.categories[i].color;
    xValues.push(categoryName);
    yValues.push(categoryScore);
    barColors.push(categoryColor);
  }

  new Chart("myChart", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [{
        label: 'Score out of 10',
        backgroundColor: barColors,
        data: yValues
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: true
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    }
  });
}

function appendResponse(apiResponse) {
    let summary = apiResponse.summary;
    let section = document.querySelector('.responseSection');

    createChart(apiResponse);

    injectedAbout.innerHTML = summary;
    section.style.display = 'flex';
}

async function getData() {
  let newUrl = await formatInput();
  let request = await fetch(newUrl);
  let response = await request.json();
  return response
}

submitBtn.addEventListener('click', () => {
  getData().then((data) => {
    appendResponse(data);
  });
  inputForm.value =  '';
});

inputForm.addEventListener('keydown', (event) => {
  if(event.keyCode === 13) {
    event.preventDefault();
    getData().then((data) => {
      appendResponse(data);
    })
    inputForm.value =  '';
  };
}); 
  
