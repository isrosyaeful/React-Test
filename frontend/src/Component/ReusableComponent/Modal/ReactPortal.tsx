
import { createPortal } from 'react-dom';

interface PropsData{
    children:any;
    wrapperId:string;

}
const ReactPortal:React.FC<PropsData> =({ children, wrapperId }) =>{
  return createPortal(children, document.getElementById(wrapperId) as HTMLElement);
}
export default ReactPortal;