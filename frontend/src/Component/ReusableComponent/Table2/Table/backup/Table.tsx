import "./Table.scss";

interface TableRow {
    [key: string]: any;
  }

interface PropsData{
    data:TableRow[],
    headerData?:string[],
    onSelect?: ()=> void,
    onClick?: ()=>void
}

const Table:React.FC<PropsData> = ({data, headerData=[], onSelect, onClick}) =>{
    if (headerData.length===0 && data.length>0){
        headerData = ["No","Country","Currency"];
        headerData = Object.keys(new Object(data[0]))
    }
    return (
        <div className='t-container'>
            <table cellSpacing={"1px"} bgcolor="#FFFFCC">
                <thead >
                    <tr className="t-header">
                        {headerData.map((d,i)=>(
                            <th key={i}>{d}</th>
                        ))}
                    </tr>
                </thead>
                        
                <tbody className="t-body">
                    {data.map((d,i)=>{

                        let columnList: Array<keyof PropsData["data"][number]> = Object.keys(d);//["no","country", "currency"];
                        return(
                        <tr key={"tr-"+i}>
                            {columnList.map((column,j)=>(
                                <td key={"td-"+j} id={"td-"+j} onClick={onClick} onSelect={onSelect} >{d[column]}</td>
                            ))}

                        </tr>
                    )}
                    )}
                </tbody>
                {/* TABLE MAIN */}
                {/* {props.data.map((d)=>(d['country']))} */}
            </table>
        </div>
    );
}

export default Table;


