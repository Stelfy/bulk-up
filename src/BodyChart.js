import { Line } from "react-chartjs-2";
import { Chart as ChartJS, Legend, TimeScale, LinearScale, PointElement, LineElement, Filler, Tooltip } from "chart.js";
import 'chartjs-adapter-date-fns';
import { enGB } from "date-fns/locale";

ChartJS.register(Legend, TimeScale, LinearScale, PointElement, LineElement, Filler, Tooltip);


const BodyChart = ({ sizeHistory }) => {

  const backgroundColor = "rgba(0, 140, 255, 1)";
  const backgroundColorTransp = "rgba(0, 140, 255, 0.3)"

  const sizeArray = sizeHistory.map(x => x.size);
  const timeArray = sizeHistory.map(x => x.date);

  const data = {
    labels: timeArray,
    datasets: [
      {
        label: "size",
        data: sizeArray,
        lineTension: 0.4,
        fill: true,
        backgroundColor: backgroundColorTransp,
        borderColor: backgroundColor,
        pointBackgroundColor: backgroundColor,
      }
    ]
  }

  const options = {
    responsive: true,
    radius: 3,
    scales: {
      xAxes: {
        type: 'time',
        time: {
          unit: 'day',
        },
        adapters: {
          date: {
            locale: enGB
          }
        },
        ticks: {
          source: 'labels'
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      }
    },
    animation: {
      duration: 500
    }
  }

  return ( 
    <div className="body-graph">
      <Line data={data} options={options} />
    </div>
  );
}
 
export default BodyChart;