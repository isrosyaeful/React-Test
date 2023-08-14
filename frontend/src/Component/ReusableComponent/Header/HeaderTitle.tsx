
import { useEffect, useState } from "react";
import "./Header.scss";


interface PropsData{
    title:string
}
function HeaderTitle(props:PropsData) {
    const [title,setTitle] = useState("");
    useEffect(()=>{
        setTitle(props.title)
    },[props]);

    return (
        <div className='header-title'>
            <span>{title}</span>
        </div>
    );
}

export default HeaderTitle;
