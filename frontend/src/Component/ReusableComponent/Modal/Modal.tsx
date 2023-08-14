// src/components/Modal/Modal.js
import "./Modal.scss";
import ReactPortal from "./ReactPortal";
import { useRef,useState, useEffect} from "react";


interface PropsData{
    children:any;
    isOpen:boolean;
    handleClose:()=>void;
    customClass?:string;
    customStyle?:React.CSSProperties;
}
const Modal:React.FC<PropsData> = ({ children, isOpen, handleClose, customClass, customStyle}) => {
  const mainContent = useRef<any>(null);
  const [closeButtonStyle, setCloseButtonStyle] = useState<React.CSSProperties>({
    transform: "translate(0,0)"
  });
  const [contentClass, setContentClass] = useState<string>("modal-content");
  const [contentStyle, setContentStyle] = useState<React.CSSProperties>({});

  // console.log(mainContent)

  useEffect(() => {
    if (mainContent.current){
      setCloseButtonStyle({
        transform:`translate(${mainContent.current.clientWidth/2}px, 15px)`
      });
    }
    if (customClass){
      setContentClass((prev)=> `${prev} ${customClass}`)
    }
    if (customStyle){
      setContentStyle(customStyle);
    }

    return () => {
    };
    
  }, [isOpen]);

  if (!isOpen) return <></>;

  return (
    <ReactPortal wrapperId="popup-1">
        <div className="modal">
        <button onClick={handleClose} className="close-btn" style={closeButtonStyle}>
            X
        </button>
        <div 
          ref={mainContent}
          className={contentClass}
          style={contentStyle}
        >
          {children}
        </div>
        </div>
    </ReactPortal>
  );
}
export default Modal;