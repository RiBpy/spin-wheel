const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
const namesList = document.getElementById("names");

// Names to be displayed on the wheel (modify this array as needed)
const names = ["Alice", "Bob", "Charlie", "David", "Eve"];
//create ul in dom
const ul=document.createElement('ul')
//map every name from names array and add them in ul
names.map(name=>{
  const li =document.createElement('li')
  li.innerHTML=name
  ul.appendChild(li)
})
//add generated ul in namesList
namesList.appendChild(ul)

// Generate data based on the number of names
const data = Array(names.length).fill(1);

// Background colors for each section (modify as needed)
const pieColors = [
  "blue",
  "green",
  "yellow",
  "red",
  "purple",
];

// Create the chart
const myChart = new Chart(wheel, {
  type: "pie",
  data: {
    labels: names,
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: {
        display: false,
      },
      datalabels: {
        color: "black",
        formatter: (_, context) =>
          context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});

// Object that stores values of the minimum and maximum angle for a value
const rotationValues = [];

// Generate rotation values based on the number of names
const angleStep = 360 / names.length;
let minAngle = 0;
for (const name of names) {
  const maxAngle = minAngle + angleStep;
  rotationValues.push({ minDegree: minAngle, maxDegree: maxAngle, value: name });
  minAngle = maxAngle;
}

// Display value based on the randomAngle
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<h6>${i.value}</h6>`;
      spinBtn.disabled = false;
      break;
    }
  }
};

// Spinner count
let count = 0;
// 100 rotations for animation and the last rotation for the result
let resultValue = 101;

// Start spinning
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  let rotationInterval = window.setInterval(() => {
    myChart.options.rotation = myChart.options.rotation + resultValue;
    myChart.update();
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});
