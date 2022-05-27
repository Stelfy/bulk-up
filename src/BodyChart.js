import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

const BodyChart = ({ sizeHistory }) => {

  const sizeArray = sizeHistory.map(x => x.size);
  const timeArray = sizeHistory.map(x => {
    const date = x.date;
    return `${date.year}-${date.month}-${date.day}`;
  })

  const data = {
    labels: timeArray,
    datasets: [
      {
        label: "size",
        data: sizeArray,
      }
    ]
  }

  const options = {
  scales: {
    xAxes: [{
      type: 'time',
    }]
  }
}

  return ( 
    <div className="bodyGraph">
      <Line data={data} options={options} />
    </div>
  );
}
 
export default BodyChart;