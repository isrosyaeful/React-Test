//@ts-nocheck

import React, { useState, useEffect } from 'react';
import './Table.scss';

function Table(props) {
  const [selectedRow, setSelectedRow] = useState(null);
  const mainClasses = 'CurrencyTable '+ (props.className?props.className:'');
  const {handleSelectedRow, handleDoubleClickRow} = props;
  const data = props.data;

  useEffect(()=>{
    // console.log(props.data[selectedRow]);
    handleSelectedRow(props.data[selectedRow]);
  }, [selectedRow])

  const handleDoubleClick = (data) =>{
    handleDoubleClickRow(data)
  }

  return (
    <div className={mainClasses}>
        {/* TESTTABLE1 */}
        <table>
        <thead>
            {props.headerData.map((row, index) => {
                return (
                  <tr key={index} className="currencyTableHeader">
                    {Object.values(row).map((v) => {return(<td>{v}</td>)})}
                  </tr>
                );
            })}
        </thead>
        <tbody>
            {props.data.map((row, index) => (
            <tr
                key={index}
                onClick={() => setSelectedRow(index)}
                onDoubleClick={() => handleDoubleClick(data[index])}
                className={(selectedRow === index ? "selected" : "")}
            >
                
                {Object.values(row).map((v) => {return(<td>{v}</td>)})}
            </tr>
            ))}
        </tbody>
        </table>
        <div></div>
        {/* {console.log(data[selectedRow])} */}
    </div>
  );
}

export default Table;

  