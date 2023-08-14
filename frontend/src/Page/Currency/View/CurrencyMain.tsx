import "../Currency.scss";
import Table from "../../../Component/ReusableComponent/Table/Table";
import { useState, useRef, useEffect } from "react";
import Button from "../../../Component/ReusableComponent/Button/Button";
import Modal from "../../../Component/ReusableComponent/Modal/Modal";
import LineChartPopUp from "./LineChartPopUp/LineChartPopUp";

import { UseQueryResult, useQuery } from "@tanstack/react-query";

interface TableRow {
  [key: string]: any;
}
interface TableData {
  data: TableRow[];
}
interface ChartData{
  xAxis: string[],
  yAxis: number[]
}

function CurrencyMain() {
  
  const [isPopUp, setIsPopUp] = useState<boolean>(false);
  const [chartCurrency, setChartCurrency] = useState<number>(0);
  const [chartTitle, setChartTitle] = useState<string>('');
  const [rawData, _] = useState<TableData>({
    data: [
    //   {
    //     no: 1,
    //     id:1,
    //     country: "Indonesia Test",
    //     currency_value: 10000,
    //   },

    //   {
    //     no: 2,
    //     id: 2,
    //     country: "Singapore TEST",
    //     currency_value: 5000,
    //   },
    ],
  });

  const [selectedData, setSelectedData] = useState<TableRow[]>([])

  const currencyData: UseQueryResult<TableRow[]> = useQuery({
    queryKey: ['currency'], 
    queryFn : async() =>{
      let res = await fetch('http://localhost:3001/api/currency')
      return res.json();
    }
  })
  const deleteDataAPI: UseQueryResult<TableRow[]> = useQuery({
    queryKey: ['delete'], 
    queryFn : async() =>{
      let res={rowCount:0};
      console.log("deleteDataAPI: JSON.stringify(selectedData)");
      console.log(JSON.stringify(selectedData));
      for (let i=0; i<selectedData.length;i++){
        //@ts-ignore
        res = await fetch('http://localhost:3001/api/delete-currency/'+selectedData[i]['id']);
      }
      return res;
    } ,
    enabled:false
  })
  const addDataAPI: UseQueryResult<TableRow[]> = useQuery({
    queryKey: ['delete'], 
    queryFn : async() =>{
      let res
      //@ts-ignore
      if (country.current.value.length>0 && currencyValue.current.value>0){
        //@ts-ignore
        res=await fetch(`http://localhost:3001/api/add-currency/${country.current.value}/${Number(currencyValue.current.value)}`);
      }
      return res;
    } ,
    enabled:false
  })
  const generateChartData: UseQueryResult<ChartData> =useQuery({
    queryKey:['chartData'],
    queryFn: async()=>{
      let res
      res=await fetch(`http://localhost:3001/api/currency-chart/${(chartCurrency)}`);
      return res.json();
    } ,
    enabled:false
  })

  
  useEffect(()=>{
    console.log(chartCurrency);
    const generateData = async()=>{
      await generateChartData.refetch();
      console.log(JSON.stringify(generateChartData.data));
      setIsPopUp(true);
    }
    generateData();
  },[chartCurrency])
 
  const country = useRef<HTMLInputElement>(null);
  const currencyValue = useRef<HTMLInputElement>(null);
  let tableData: TableData;
  
  
  if (currencyData.isSuccess){
    tableData = {data:currencyData.data};
  } else {
    tableData = JSON.parse(JSON.stringify(rawData));
  }

  while (tableData.data.length < 6) {
    tableData.data.push({
      id: null,
      no: null,
      country: null,
      currency: null,
    });
  }

  const handleDataSelected = (data: TableRow[]) => {
    // selectedData = data;
    setSelectedData(data);
    // console.log(selectedData);
  };

  const HandleAddData = async () => {
    await addDataAPI.refetch();
    await currencyData.refetch();
  };

  const HandleDeleteData = async(deletedData: TableRow[]) => {
    console.log("deletedData");
    console.log(deletedData);
    await deleteDataAPI.refetch();
    await currencyData.refetch();
    setSelectedData([]);
  };

  const handleCurrencyDoubleClick = async (data:TableRow) =>{
    console.log(JSON.stringify(data));
    setChartCurrency((data['currency_value']) ? data['currency_value'] :0);
    setChartTitle(data['country'])
    // await generateChartData.refetch();
    // console.log(JSON.stringify(generateChartData.data));
    // setIsPopUp(true);
  }

  return (
    <>
      <div className="currency-top-margin">{JSON.stringify(currencyData.data)}</div>
      <div className="currency-main">
        <div className="currency-main-left-margin"></div>
        <div className="currency-main-container">
          <div className="currency-main-container__table" >
            {tableData.data && (
              <Table
                data={tableData.data}
                headerData={["No", "Country", "Currency"]}
                multiSelect={true}
                selectedDataChange={handleDataSelected}
                onDoubleClickRow={handleCurrencyDoubleClick}
              />
            )}
            
          </div>

          <div className="currency-main-container__form">
            <span>Country: </span>
            <input type="text" ref={country}></input>
            <span>Currency: </span>
            <input type="number" ref={currencyValue}></input>
            <div className="empty-space"></div>
            <Button
              onClick={() => {
                if (country.current && currencyValue.current)
                  HandleAddData();
              }}
            >
              Add
            </Button>
            <Button
              onClick={() => {
                  HandleDeleteData(selectedData);
              }}
            >
              Delete
            </Button>
          </div>
        </div>
        <div className="currency-main-right-margin"></div>
      </div>
      <div className="currency-bot-margin">
        <button onClick={() => setIsPopUp(true)}>TEST</button>
        <Modal 
          handleClose={() => setIsPopUp(false)} 
          isOpen={isPopUp}
          customClass=" "
          customStyle={{width:'80vw'}}
        >
          <LineChartPopUp 
            country={chartTitle} 
            currency={100}
            yAxisData={(generateChartData.data) ? generateChartData.data['yAxis'] : undefined}
            xAxisData={(generateChartData.data) ? generateChartData.data['xAxis'] : undefined}
          ></LineChartPopUp>
        </Modal>
      </div>
    </>
  );
}

export default CurrencyMain;
