import "./LineChartPopUp.scss"
import LineChart from "../../../../Component/ReusableComponent/LineChart/LineChart";
import { faker } from '@faker-js/faker';
interface PropsData{
    country:string;
    currency:number;
    yAxisData?:number[];
    xAxisData?:string[];
}
interface ChartData{
  labels:string[],
  datasets:{
    label:string,
    data:number[],
    borderColor:string,
    backgroundColor:string,
    fontSize:string
  }[]
}
const defaultLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

let defaultData:ChartData = {
  labels:defaultLabels,
  datasets: [
    {
      label: 'Dataset 1',
      data: defaultLabels.map(() => faker.number.int({ min: 100, max: 150 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      fontSize:'40px'
    }
  ],
};
const LineChartPopUp:React.FC<PropsData> = ({
    country="Indonesia",
    currency=10000,
    yAxisData=[0,0,0,0,0,0,0],
    xAxisData=defaultLabels
})=>{
    let title = `${country} Currency`;
    console.log(currency);
    
    console.log(JSON.stringify(yAxisData));
    console.log(JSON.stringify(xAxisData));
    let tempData:ChartData = defaultData;
    if (tempData.datasets[0]) tempData.datasets[0].data=yAxisData;
    tempData.labels=xAxisData;
    return (
    <div className="lcp">
        <div className="lcp-title">{title}</div>
        <div className="lcp-chart">
            <LineChart data={defaultData}></LineChart>
        </div>
    </div>
    )
}

export default LineChartPopUp;