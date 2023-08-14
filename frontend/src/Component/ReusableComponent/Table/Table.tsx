
import "./Table.scss";
import { useEffect, useState } from "react";
interface TableRow {
  [key: string]: any;
}

interface PropsData {
  data: TableRow[];
  headerData?: string[];
//   onSelect?: () => void | undefined;
  selectedDataChange?: (data:any) => void;
  onDoubleClickRow?: (data:any) => void;
  multiSelect?: boolean | undefined;
//   selectedData?:TableRow[];
}

const Table: React.FC<PropsData> = ({
  data,
  headerData = [],
  selectedDataChange,
  onDoubleClickRow,
  multiSelect,
//   selectedData
}) => {
  const [selectedData, setSelectedData] = useState<TableRow[]>([]);

  useEffect(() => {
    if (selectedDataChange){
        selectedDataChange(selectedData);
    }
  }, [selectedData]);

  const handleOnClick = (data: TableRow) => {
    let dataIndex = selectedData['indexOf'](data);
    if (dataIndex >= 0) {
    //   console.log("test");
    //   console.log(selectedData.filter((_, i) => i !== dataIndex));
      setSelectedData((prev) => prev.filter((_, i) => i !== dataIndex));
    } else {
      if (multiSelect) {
        setSelectedData((prev) => {
          return [...prev, data];
        });
      } else {
        setSelectedData(() => {
          return [data];
        });
      }
    }

  };
  const handleDoubleClick = (data:TableRow) =>{
    if (onDoubleClickRow) {
      onDoubleClickRow(data);
    }
  }
  if (headerData.length === 0 && data.length > 0) {
    // headerData = ["No", "Country", "Currency"];
    headerData = Object.keys(new Object(data[0]));
  }
  return (
    <div className="t-container">
      <table cellSpacing={"1px"} bgcolor="#FFFFCC">
        <thead>
          <tr className="t-header">
            {headerData.map((d, i) => (
              <th key={i}>{d}</th>
            ))}
          </tr>
        </thead>

        <tbody className="t-body">
          {data.map((d, i) => {
            let columnList: Array<keyof PropsData["data"][number]> =
              Object.keys(d); //["no","country", "currency"];
            let rowClass = selectedData.includes(d) ? " selected" : "";
            return (
              <tr key={"tr-" + i} className={rowClass + " "} onDoubleClick={()=>{handleDoubleClick(d)}}>
                {columnList.map((column, j) => {
                  if (column!=='id')
                    return (
                      <td
                        key={"td-" + j}
                        id={"td-" + j}
                        onClick={() => {
                          if (d['no'] !== null) handleOnClick(d);
                        }}
                      >
                        {d[column]}
                      </td>
                    );
                  else 
                    return null
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
