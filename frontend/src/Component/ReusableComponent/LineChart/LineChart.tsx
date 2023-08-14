import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  defaults
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
defaults.font.size=24;
const defaultOptions = {
  responsive: true,
  plugins: {
    legend: {
      display:false,
      position: 'top' as const,
    },
    title: {
      display: false,
      text: '',
    },
    
    scales: {
      // x: {
      //     type: 'time',
      //     min: new Date('2019-01-01').valueOf(),
      //     max: new Date('2019-12-31').valueOf()
      // },
        y: {
            suggestedMin:0,
            min: 0,
            max: 200,
            beginAtZero:true
          
        }
    }
  },
};

const defaultLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const defaultData = {
  labels:defaultLabels,
  datasets: [
    {
      label: 'Dataset 1',
      data: defaultLabels.map(() => faker.number.int({ min: -1000, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)'
    },
    // {
    //   label: 'Dataset 2',
    //   data: defaultLabels.map(() => faker.number.int({ min: -1000, max: 1000 })),
    //   borderColor: 'rgb(53, 162, 235)',
    //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
    // },
  ],
};

interface Options{
  [key:string]:any
}
interface Dataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
}

interface ChartData {
  labels: string[];
  datasets: Dataset[];
}

interface PropsData{
  data?:ChartData | undefined;
  options?:Options | undefined;
}

const LineChart:React.FC<PropsData> = ({
  data=defaultData,
  options=defaultOptions
}) => {
  let lineData =data;// data1 ? data1 : defaultData;
  let lineOptions = options;//options1 ? options1 : defaultOptions;
  return <Line options={lineOptions} data={lineData} />;
}

export default LineChart;
